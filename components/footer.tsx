import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-24">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-mono text-sm uppercase tracking-wide mb-4">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Lab68 Events brings together developers, innovators, and thought leaders to learn, share, and grow.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wide mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#schedule" className="text-muted-foreground hover:text-primary transition-colors">
                  Schedule
                </Link>
              </li>
              <li>
                <Link href="#speakers" className="text-muted-foreground hover:text-primary transition-colors">
                  Speakers
                </Link>
              </li>
              <li>
                <Link href="#tickets" className="text-muted-foreground hover:text-primary transition-colors">
                  Tickets
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-sm uppercase tracking-wide mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-muted-foreground hover:text-primary transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:lab68dev@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <p className="font-mono text-xs text-muted-foreground text-center">
            © 2025 Lab68 Events — Built with passion and code. Think. Code. Test. Ship.
          </p>
        </div>
      </div>
    </footer>
  )
}
