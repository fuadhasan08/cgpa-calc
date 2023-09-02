import './globals.css';

export const metadata = {
  title: 'AIUB CGPA CALCULATOR',
  description: 'AIUB CGPA CALCULATOR by Dipro',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        {children}
        <footer >
          Made with ❤️ by{' '}
          <a href='https://fuadhasandipro.netlify.app/'>Dipro</a>
        </footer>
      </body>
    </html>
  );
}
