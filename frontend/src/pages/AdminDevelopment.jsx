import { useNavigate } from "react-router-dom";
import { Building2, Pencil, ArrowLeft } from "lucide-react";

const AdminDevelopment = () => {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-100 p-6 md:p-8">

      <div className="max-w-6xl mx-auto">


        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-sm font-semibold tracking-widest text-orange-600">

              ADMIN PANEL

            </p>


            <h1 className="text-3xl font-bold text-slate-800 mt-1">

              Development Management

            </h1>


            <p className="text-slate-500 mt-2">

              Manage development projects and achievements.

            </p>

          </div>


          <button

            onClick={() => navigate("/admin")}

            className="flex items-center gap-2 border border-slate-300 bg-white px-5 py-3 rounded-xl"

          >

            <ArrowLeft size={18} />

            Back to Dashboard

          </button>

        </div>


        <div className="bg-white rounded-2xl border border-slate-200 min-h-[400px] flex flex-col items-center justify-center">


          <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mb-6">

            <Building2
              size={32}
              className="text-green-700"
            />

          </div>


          <h2 className="text-3xl font-bold text-slate-800">

            Development Management

          </h2>


          <p className="mt-3 text-center text-slate-500 max-w-xl">

            Add and update development initiatives, projects,
            achievements and public welfare activities.

          </p>


          <button

            onClick={() =>
              navigate("/admin/development/edit")
            }

            className="mt-8 flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl"

          >

            <Pencil size={20} />

            Edit Development Content

          </button>


        </div>

      </div>

    </div>

  );

};

export default AdminDevelopment;