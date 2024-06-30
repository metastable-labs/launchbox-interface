interface Prop {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Prop>) {
  return <main>{children}</main>;
}
