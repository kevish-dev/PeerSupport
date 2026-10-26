import LandingPage from "../components/landing/LandingPage";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "../lib/seo";

export const metadata = {
  title: "MBA Mentorship and B-School Guidance | PeerSupport",
  description: "Get honest, one-to-one MBA guidance from experienced mentors. Explore B-school choices, resume reviews, interview preparation, and career decisions.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd()} />
      <LandingPage />
    </>
  );
}
