import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="px-1 py-4 text-right text-sm text-primary/60 md:text-xs">
      <p>
        ❤ proudly made by{' '}
        <Link
          className="text-primary/90 underline-offset-2 hover:underline"
          href="https://github.com/luccasfr"
          target="_blank"
        >
          lucas ferreira
        </Link>
      </p>
      <p>
        <Link
          className="text-primary/90 underline-offset-2 hover:underline"
          href="https://jerasoft.com.br"
          target="_blank"
        >
          jerasoft
        </Link>{' '}
        &copy; {new Date().getFullYear()}
      </p>
    </footer>
  )
}
