import Footer from "../components/Footer"
import { Link } from 'react-router-dom';

export default function ErrorPage() {
    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full">
          <body class="h-full">
          ```
        */}
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-green-500">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">페이지를 찾을 수 없습니다.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/"
                className="rounded-md bg-green-500 px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-green-600"
              >
                메인페이지로
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }