import "bootstrap/dist/css/bootstrap.min.css"
import Head from "next/head"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <style>{`
          body {
            background-color: #f8f9fa;
          }
          .hover-shadow:hover {
            box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          }
          .transition-all {
            transition: all 0.3s ease-in-out;
          }
          .card-img-wrapper {
            overflow: hidden;
            position: relative;
            padding-top: 66.67%; /* 3:2 aspect ratio */
          }
          .card-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.3s ease-in-out;
          }
          .card:hover .card-img {
            transform: scale(1.05);
          }
          .rounded-pill {
            border-radius: 50rem !important;
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp

