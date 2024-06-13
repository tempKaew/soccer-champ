import { Logo } from 'components/logo'

export default function Login() {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center h-screen">
        <Logo className="mb-4 text-xl" />
        <div className="max-w-md w-full p-6 border rounded-lg border-gray-700 bg-gray-800">
          <h1 className="text-2xl font-medium pb-5">Sign in to your account</h1>
          <form action="#">
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="aaa@aaa.com"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <input
                type="password"
                name="Password"
                id="Password"
                className="w-full rounded-lg bg-gray-700 border border-gray-600 text-white p-2.5 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full text-white bg-primary-600 rounded-lg py-2.5 font-medium hover:bg-primary-700"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
