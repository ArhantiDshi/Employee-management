import { useCallback, useEffect, useState, type FormEvent } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import api from '../services/apiClient';

type AccountRole = 'ADMIN' | 'HR_MANAGER' | 'VIEWER';
interface Account {
  id: number;
  username: string;
  role: AccountRole;
  enabled: boolean;
  createdAt: string;
}

const roles: AccountRole[] = ['ADMIN', 'HR_MANAGER', 'VIEWER'];

function UserAccounts() {
  const { username: currentUsername } = useAuth();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<AccountRole>('HR_MANAGER');
  const [resetTarget, setResetTarget] = useState<number | null>(null);
  const [resetPassword, setResetPassword] = useState('');

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get<Account[]>('/users');
      setAccounts(response.data);
      setError('');
    } catch {
      setError('Unable to load user accounts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadAccounts(); }, [loadAccounts]);

  const createAccount = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    setNotice('');
    try {
      await api.post('/users', { username, password, role });
      setUsername('');
      setPassword('');
      setRole('HR_MANAGER');
      setNotice('Account created. Share the temporary password securely.');
      await loadAccounts();
    } catch (requestError: unknown) {
      const status = axios.isAxiosError(requestError) ? requestError.response?.status : undefined;
      setError(status === 409
        ? 'That username is already in use.'
        : status === 400
          ? 'Check the username and password requirements.'
          : 'Unable to create the account.');
    } finally {
      setSaving(false);
    }
  };

  const changeAccount = async (account: Account, update: { role?: AccountRole; enabled?: boolean }) => {
    setError('');
    setNotice('');
    try {
      const response = await api.patch<Account>(`/users/${account.id}`, update);
      setAccounts((current) => current.map((item) => item.id === account.id ? response.data : item));
      setNotice(`Updated ${account.username}'s account.`);
    } catch (requestError: unknown) {
      const detail = axios.isAxiosError(requestError)
        ? requestError.response?.data?.detail
        : undefined;
      setError(detail ?? 'Unable to update the account. Make sure at least one enabled administrator remains.');
    }
  };

  const resetAccountPassword = async (event: FormEvent, account: Account) => {
    event.preventDefault();
    try {
      await api.patch(`/users/${account.id}`, { password: resetPassword });
      setResetTarget(null);
      setResetPassword('');
      setNotice(`Password reset for ${account.username}. Share it securely.`);
      setError('');
    } catch {
      setError('Password must be 12-72 characters.');
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User accounts</h1>
        <p className="mt-1 text-slate-600">Create accounts and assign access levels.</p>
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>}
      {notice && <p role="status" className="rounded-lg bg-green-50 p-4 text-green-700">{notice}</p>}

      <form onSubmit={createAccount} className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4 md:items-end">
        <div>
          <label htmlFor="new-username" className="mb-1 block text-sm font-medium">Username</label>
          <input id="new-username" required minLength={3} maxLength={80} pattern="[A-Za-z0-9._-]+" value={username} onChange={(event) => setUsername(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="new-password" className="mb-1 block text-sm font-medium">New password</label>
          <input id="new-password" type="password" autoComplete="new-password" required minLength={12} maxLength={72} value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-lg border border-slate-300 px-3 py-2" />
        </div>
        <div>
          <label htmlFor="new-role" className="mb-1 block text-sm font-medium">Role</label>
          <select id="new-role" value={role} onChange={(event) => setRole(event.target.value as AccountRole)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2">
            {roles.map((item) => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
          </select>
        </div>
        <button disabled={saving} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-60">
          {saving ? 'Creating…' : 'Create account'}
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? <p className="p-6 text-slate-600">Loading accounts…</p> : (
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-sm text-slate-600"><tr>
              <th className="px-5 py-3">Username</th><th className="px-5 py-3">Role</th><th className="px-5 py-3">Status</th><th className="px-5 py-3">Created</th><th className="px-5 py-3">Password</th>
            </tr></thead>
            <tbody>
              {accounts.map((account) => {
                const isCurrent = account.username === currentUsername;
                return <tr key={account.id} className="border-t border-slate-200">
                  <td className="px-5 py-4 font-medium text-slate-800">{account.username}{isCurrent && <span className="ml-2 text-xs text-slate-500">(you)</span>}</td>
                  <td className="px-5 py-4">
                    <select aria-label={`Role for ${account.username}`} disabled={isCurrent} value={account.role} onChange={(event) => void changeAccount(account, { role: event.target.value as AccountRole })} className="rounded-lg border border-slate-300 bg-white px-2 py-1 disabled:bg-slate-100">
                      {roles.map((item) => <option key={item} value={item}>{item.replace('_', ' ')}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4">
                    <button type="button" disabled={isCurrent} onClick={() => void changeAccount(account, { enabled: !account.enabled })} className={`rounded-full px-3 py-1 text-sm font-medium disabled:opacity-50 ${account.enabled ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>
                      {account.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{new Date(account.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    {resetTarget === account.id ? (
                      <form onSubmit={(event) => void resetAccountPassword(event, account)} className="flex min-w-64 gap-2">
                        <input aria-label={`New password for ${account.username}`} type="password" autoComplete="new-password" required minLength={12} maxLength={72} value={resetPassword} onChange={(event) => setResetPassword(event.target.value)} className="w-40 rounded border border-slate-300 px-2 py-1" />
                        <button className="text-sm font-semibold text-blue-700">Save</button>
                        <button type="button" onClick={() => { setResetTarget(null); setResetPassword(''); }} className="text-sm text-slate-500">Cancel</button>
                      </form>
                    ) : (
                      <button type="button" onClick={() => { setResetTarget(account.id); setResetPassword(''); }} className="text-sm font-medium text-blue-700 hover:text-blue-900">Reset password</button>
                    )}
                  </td>
                </tr>;
              })}
              {accounts.length === 0 && <tr><td colSpan={5} className="px-5 py-8 text-center text-slate-500">No accounts found.</td></tr>}
            </tbody>
          </table>
        )}
      </div>
    </section>
  );
}

export default UserAccounts;
