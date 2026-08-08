import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import FocusAreas from "../components/home/FocusAreas";
import DevelopmentHighlights from "../components/home/DevelopmentHighlights";
import GalleryPreview from "../components/home/GalleryPreview";
import NewsPreview from "../components/home/NewsPreview";
import VideosPreview from "../components/home/VideosPreview";
import ContactCTA from "../components/home/ContactCTA";

export default function Home(){

    return(

        <>

            <Hero/>

            <AboutPreview/>

            <FocusAreas/>

            <DevelopmentHighlights/>

            <GalleryPreview/>

            <NewsPreview/>

            {/* <VideosPreview/> */}

            <ContactCTA/>

        </>

    );

}
