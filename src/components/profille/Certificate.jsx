import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsPencilFill } from "react-icons/bs";
import { formDataActions } from "../../store/slices/formData";
import { updateProfile } from "../../helpers/addSingle";
import { deleteProfile } from "../../helpers/deleteProfile";
import { HandleEditProfile } from "../../helpers/editProfile";
import { editSingle } from "../../helpers/updateSingle";

const Certificate = () => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [addNewData, setAddNewData] = useState(false);
  const [editData, setEditData] = useState(null);
  const [ableToEdit, setBeAbleToEdit] = useState(false);
  const certificate0 = useSelector(
    (state) => state.logged.userData.profile.certification
  );

  useEffect(() => {
    // Use a separate function to handle the asynchronous data transformation
    const certificates = certificate0.flatMap((inner) => inner);
    dispatch(formDataActions.addCertificate(certificates));
  }, [certificate0]);
  const certificateInitialValues0 = useSelector(
    (state) => state.formData.certificate
  );
  const certificateValues = certificateInitialValues0.flatMap((inner) => inner);
  const [certificate, setCertificate] = useState({
    _id: Math.floor(Math.random() * 90),
    title: "",
    description: "",
  });

  const updateTitle = (e) => {
    setCertificate((prev) => ({ ...prev, title: e.target.value }));
  };

  const updateDescription = (e) => {
    setCertificate((prev) => ({ ...prev, description: e.target.value }));
  };

  function convertToObjects(arr) {
    return arr.filter(item => typeof item === 'object' && !Array.isArray(item));
  }
  
  

  const handleNewData = async (e) => {
    e.preventDefault();

    // Add a new invention
    dispatch(formDataActions.addCertificate(certificate));

     updateProfile("certification",certificate)

    setAddNewData(false);
    setEditData(null); // Reset the edit state after successfully handling edit or adding a new invention
  };
  const handleEdit = (itemId) => {
    setBeAbleToEdit((prev) => !prev);
    setEditData(itemId);
    const itemToEdit = certificateValues.find((item) => item._id === itemId);
    setCertificate({
      _id: itemToEdit._id,
      title: itemToEdit.title,
      description: itemToEdit.description,
    });

    setAddNewData(false); // Close the add new data form when opening the edit form
  };

  const handleAddNewData = () => {
    if (editData) {
      // Reset the editData state to null if in edit mode
      setEditData(null);
    } else {
      // Toggle the addNewData state if not in edit mode
      setAddNewData((prev) => !prev);
    }
    // Reset the invetion state to its initial empty values
    setCertificate({
      _id: Math.floor(Math.random() * 90),
      title: "",
      description: "",
    });
  };
  const handleEditChanges = (e) => {
    e.preventDefault();
    const editCertificate = {
      _id: editData,
      title: certificate.title,
      description: certificate.description,
    };
    editSingle("certification", editCertificate);
    dispatch(formDataActions.editCertificate(editCertificate));
    setEditData(null);
    setCertificate({
      _id: null,
      title: "",
      description: "",
    });
  };

  const handleDelete = (_id) => {
    dispatch(formDataActions.deleteCertificate({ _id: _id }));
    deleteProfile(_id);
  };

  return (
    <div className="h-full sm:px-20   overflow-x-hidden">
      <div className="bg-white">
        <div className="w-full border-b py-5  relative    ss:px-[5%] ">
          <h1 className="text-[#9E6F27] font-extrabold text-xl">Certificate</h1>
          <div
            className="absolute right-2 top-5 hover:cursor-pointer "
            onClick={handleAddNewData}
          >
            <img
              src="/assets/add.png"
              alt="add new invetion"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          {addNewData && (
            <div className="w-full border-b py-5  relative    ss:px-[5%]">
              <form
                className=" flex flex-col gap-5"
                onSubmit={handleNewData}
              >
                <div className="flex flex-col">
                  <label htmlFor="title" className="text-[#555555] ">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="border-2 indent-5 w-[50%]  rounded-md"
                    required
                    value={certificate.title}
                    onChange={updateTitle}
                  />
                </div>
                <div className="flex ss:flex-col lg:flex-row   lg:items-end  ss:gap-6 ">
                  <div className="flex flex-col md:w-full  ">
                    <label htmlFor="description" className="text-[#555555] ">
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      className="border-2 indent-5 h-24 rounded-md"
                      required
                      value={certificate.description}
                      onChange={updateDescription}
                    />
                  </div>
                  <div className="align-baseline  flex md:flex-row ss:flex-col ss:gap-3   gap-5 ss:w-full-5">
                    <input
                      type="submit"
                      value="Save"
                      className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl"
                    />
                    <button
                      onClick={() => setAddNewData(false)}
                      className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
          {certificateValues.map((item) =>
            ableToEdit && editData == item._id ? (
              <>
                {" "}
                <form
                  key={item._id}
                  className="border-b  py-5 flex ss:px-[5%] flex-col gap-5"
                  onSubmit={handleEditChanges}
                >
                  <div className="flex flex-col">
                    <label htmlFor="title" className="text-[#555555] ">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className="border-2 w-[50%] indent-5 rounded-md"
                      required
                      value={certificate.title}
                      onChange={updateTitle}
                    />
                  </div>
                  <div className="flex ss:flex-col lg:flex-row   lg:items-end ss:gap-6">
                    <div className="flexflex flex-col md:w-full  ">
                      <label htmlFor="description" className="text-[#555555] ">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="border-2 w-[100%] indent-5 h-24 rounded-md"
                        required
                        value={certificate.description}
                        onChange={updateDescription}
                      />
                    </div>
                    <div className="align-baseline  flex md:flex-row ss:flex-col ss:gap-3 md:justify-between  gap-5 ss:w-full-5">
                      <input
                        type="submit"
                        value="Save"
                        className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl"
                      />
                      <button
                        onClick={() => setEditData(null)}
                        className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-10 bg-[#666666] border-2  text-white  hover:opacity-50 py-1 rounded-xl"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </form>
              </>
            ) : (
              <div
                key={item._id}
                className="border-b ss:pl-[5%] py-5 flex flex-col gap-5"
              >
                <div className="relative">
                  <h1 className="text-medium font-bold">{item.title}</h1>
                  <div
                    className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1 absolute right-2 top-2 hover:cursor-pointer"
                    onClick={() => handleEdit(item._id)} // Pass the itemId to handleEdit
                  >
                    <BsPencilFill size={20} color="white" />
                  </div>
                </div>
                <p>{item.description}</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Certificate;
