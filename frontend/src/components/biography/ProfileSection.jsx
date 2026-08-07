import Container from "../common/Container";
import Button from "../common/Button";

export default function ProfileSection() {
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

                Serving the People

              </p>

              <h3 className="font-bold text-xl">

                Since 2023

              </h3>

            </div>

          </div>

          {/* Right */}

          <div>

            <span className="uppercase tracking-[0.3em] text-orange-600 font-semibold text-sm">

              Profile

            </span>

            <h2 className="mt-4 text-4xl lg:text-5xl font-bold leading-tight">

              Shri Adluri Laxman Kumar

            </h2>

            <p className="mt-2 text-orange-600 font-semibold">

              Minister, Government of Telangana

            </p>

            <p className="mt-8 text-gray-600 leading-8">

              Shri Adluri Laxman Kumar is a public representative
              from the Dharmapuri Assembly Constituency in Jagtial
              district, Telangana. As a member of the Indian National
              Congress, he is committed to inclusive development,
              transparent governance, and improving the quality of
              life for every citizen.

            </p>

            <p className="mt-5 text-gray-600 leading-8">

              His public service focuses on strengthening education,
              healthcare, infrastructure, social justice, and welfare
              initiatives while ensuring that government programmes
              reach every eligible beneficiary.

            </p>

            <div className="grid grid-cols-2 gap-6 mt-10">

              <div>

                <h4 className="font-semibold">

                  Constituency

                </h4>

                <p className="text-gray-600 mt-2">

                  Dharmapuri

                </p>

              </div>

              <div>

                <h4 className="font-semibold">

                  District

                </h4>

                <p className="text-gray-600 mt-2">

                  Jagtial

                </p>

              </div>

              <div>

                <h4 className="font-semibold">

                  State

                </h4>

                <p className="text-gray-600 mt-2">

                  Telangana

                </p>

              </div>

              <div>

                <h4 className="font-semibold">

                  Party

                </h4>

                <p className="text-gray-600 mt-2">

                  Indian National Congress

                </p>

              </div>

            </div>

            <div className="mt-10">

              <Button>

                View Development Works

              </Button>

            </div>

          </div>

        </div>

      </Container>

    </section>
  );
}