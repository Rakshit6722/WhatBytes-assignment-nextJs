// app/page.js
import Image from "next/image";
import SkillTestPage from "./skill-test/page";

export default function Home() {
  return (
    // Removed min-h-screen since layout already handles full height
    // Adjusted padding to account for sidebar space
    <div>
      <main>
          <SkillTestPage/>
      </main>
    </div>
  );
}