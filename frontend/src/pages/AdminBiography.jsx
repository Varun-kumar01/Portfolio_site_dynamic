import { useNavigate } from "react-router-dom";
import { BookOpen, Pencil, ArrowLeft } from "lucide-react";

const AdminBiography = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-6xl mx-auto">


        {/* HEADER */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-sm font-semibold tracking-widest text-orange-600">

              ADMIN PANEL

            </p>


            <h1 className="text-3xl font-bold text-slate-800 mt-1">

              Biography Management

            </h1>


            <p className="text-slate-500 mt-2">

              Manage the biography content of the public website.

            </p>

          </div>


          <button

            onClick={() => navigate("/admin")}

            className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl hover:bg-slate-50 transition"

          >

            <ArrowLeft size={18} />

            Back to Dashboard

          </button>

        </div>


        {/* CARD */}

        <div className="bg-white rounded-2xl border border-slate-200 min-h-[400px] flex flex-col items-center justify-center">


          <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6">

            <BookOpen
              size={32}
              className="text-green-700"
            />

          </div>


          <h2 className="text-3xl font-bold text-slate-800">

            Biography Management

          </h2>


          <p className="mt-3 text-center text-slate-500 max-w-xl">

            Edit and update the complete biography information
            displayed on the public portfolio.

          </p>


          <button

            onClick={() =>
              navigate("/admin/biography/edit")
            }

            className="mt-8 flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl transition"

          >

            <Pencil size={20} />

            Edit Biography

          </button>


        </div>

      </div>

    </div>

  );

};

export default AdminBiography;