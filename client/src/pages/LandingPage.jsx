import LandingBar from "../components/LandingBar";
import LandingHero from "../components/LandingHero";
import LandingHeroCTA from "../components/LandingHeroCTA";
import LandingHeroMask from "../components/LandingHeroMask";

const LandingPage = () => {

    return(
        <div>
            <LandingHero />
            <LandingHeroMask />
            <LandingBar />
            <LandingHeroCTA />
        </div>
    )
}

export default LandingPage;