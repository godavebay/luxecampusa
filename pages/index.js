import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ textAlign: 'center', padding: '50px' }}>
        <h1>Welcome to LuxeCampUSA</h1>
        <p>This is your luxury campground directory. The site is up and running.</p>
      </main>
    </>
  );
}