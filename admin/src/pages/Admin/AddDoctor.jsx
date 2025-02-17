import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const initialValues = {
    docImg: false,
    name: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    about: "",
    speciality: "",
    degree: "",
    address1: "",
    address2: "",
  };
  const [input, setInput] = useState(initialValues);

  const { backendUrl, aToken } = useContext(AdminContext);

  const handleChange = (e) => {
    if (e.target.name === "docImg") {
      setInput((prev) => ({ ...prev, docImg: e.target.files[0] }));
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!input.docImg) {
        return toast.error("Image not selected");
      }

      const formData = new FormData();
      for (let inp in input) {
        if (inp === "address1" || inp === "address2") continue;
        if (inp === "docImg") {
          formData.append("image", input[inp]);
        } else {
          formData.append(inp, input[inp]);
        }
      }

      formData.append(
        "address",
        JSON.stringify({ line1: input.address1, line2: input.address2 })
      );

      // console formdata
      formData.forEach((value, key) => {
        console.log(`${key} : ${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        formData,
        {
          headers: { token: aToken },
        }
      );
      if (data.success) {
        toast.success(data.message);
        setInput(initialValues);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll ">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                input.docImg
                  ? URL.createObjectURL(input.docImg)
                  : assets.upload_area
              }
              alt="doc img"
            />
          </label>
          <input
            name="docImg"
            onChange={(e) => handleChange(e)}
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br /> Picture
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Your name</p>
              <input
                name="name"
                onChange={(e) => handleChange(e)}
                value={input.name}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                name="email"
                onChange={(e) => handleChange(e)}
                value={input.email}
                className="border rounded px-3 py-2"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                name="password"
                onChange={(e) => handleChange(e)}
                value={input.password}
                className="border rounded px-3 py-2"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => handleChange(e)}
                value={input.experience}
                name="experience"
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                name="fees"
                onChange={(e) => handleChange(e)}
                value={input.fees}
                className="border rounded px-3 py-2"
                type="number"
                placeholder="fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                name="speciality"
                onChange={(e) => handleChange(e)}
                value={input.speciality}
                className="border rounded px-3 py-2"
                id=""
              >
                <option value="General physician"> General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist"> Dermatologist</option>
                <option value="Pediatricians"> Pediatricians</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                name="degree"
                onChange={(e) => handleChange(e)}
                value={input.degree}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                name="address1"
                onChange={(e) => handleChange(e)}
                value={input.address1}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                name="address2"
                onChange={(e) => handleChange(e)}
                value={input.address2}
                className="border rounded px-3 py-2"
                type="text"
                placeholder="address 2"
                required
              />
            </div>
          </div>
        </div>
        <div>
          <p className="mt-4 mb-2">Abour Doctor</p>
          <textarea
            name="about"
            onChange={(e) => handleChange(e)}
            value={input.about}
            className="w-full border px-4 pt-2 rounded "
            placeholder="write about doctor"
            rows={5}
            required
          />
        </div>
        <button className="bg-primary px-10 py-3 mt-4 text-white rounded-full">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;
