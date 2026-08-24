import Container from "../common/Container";
import Button from "../common/Button";
import { useTranslation } from "react-i18next";

export default function ProfileSection() {
  const { t } = useTranslation();
  return (
    <section className="py-24 bg-white">

      <Container>

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image */}

          <div className="relative">

            <img
              src="/profile.jpg"
              alt="Adluri Laxman Kumar"
              className="rounded-2xl shadow-xl w-full"
            />

            <div className="absolute bottom-6 left-6 bg-white shadow-xl rounded-xl px-6 py-4">

              <p className="text-sm text-gray-500">

                {t("profile.servingPeople", "Serving the People")}

              </p>

              <h3 className="font-bold text-xl">

                Since 2023

              </h3>

            </div>

          </div>

          {/* Right */}

          <div>

            <span className="uppercase tracking-[0.3em] text-orange-600 font-semibold text-sm">

              {t("profile.label", "Profile")}

            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">

              {t("about.name")}

            </h2>

            <p className="mt-2 text-orange-600 font-semibold">

              {t("footer.designation")}

            </p>

            <p className="mt-8 text-gray-600 leading-8">

              {t("biographyTimeline.paragraph1")}

            </p>

            <p className="mt-5 text-gray-600 leading-8">

              {t("biographyTimeline.paragraph2")}

            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div>

                <h4 className="font-semibold">

                  {t("footer.constituency")}

                </h4>

                <p className="text-gray-600 mt-2">

                  Dharmapuri

                </p>

              </div>

              <div>

                <h4 className="font-semibold">

                  {t("footer.district")}

                </h4>

                <p className="text-gray-600 mt-2">

                  Jagtial

                </p>

              </div>

              <div>

                <h4 className="font-semibold">

                  {t("footer.state")}

                </h4>

                <p className="text-gray-600 mt-2">

                  Telangana

                </p>

              </div>

              <div>

                <h4 className="font-semibold">

                  {t("profile.party", "Party")}

                </h4>

                <p className="text-gray-600 mt-2">

                  Indian National Congress

                </p>

              </div>

            </div>

            <div className="mt-10">

              <Button>

                {t("home.hero.developmentWorks")}

              </Button>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}