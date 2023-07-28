import { BsPencilFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { aboutActions } from "../../store/slices/aboutSlice";

const About = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.logged.userData);
  const about = profile?.about || "";
  const availability = profile?.availability || [];

  const aboutObj = {
    description: about,
    selectedTime: availability,
  };
  useEffect(() => {
    dispatch(
      aboutActions.updatedAbout({
        description: aboutObj.description,
        selectedTime: aboutObj.selectedTime,
      })
    );
  }, [dispatch, aboutObj.description, aboutObj.selectedTime]);

  const aboutInitialValues = useSelector((state) => state.aboutData);
  const [editDescription, setEditDescription] = useState(false);
  const [descriptionValue, setDiscription] = useState("");
  const initialSelect = aboutInitialValues.selectedTime;
  useEffect(() => {
    setSelectedTimes(initialSelect);
  }, [initialSelect]);

  useEffect(() => {
    setDiscription(aboutInitialValues.description);
  }, [aboutInitialValues.description]);

  const handleOpenDescription = () => {
    setEditDescription((prev) => !prev);
  };

  const hoursRanges = ["0-4", "4-8", "8-12", "12-16", "16-20", "20-24"];
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const [selectedTimes, setSelectedTimes] = useState([]);


  const handleTimeClick = (day, range) => {
    const selectedTimeSlot = { day, range };
    if (selectedTimes && selectedTimes.some) {
      const isAlreadySelected = selectedTimes.some(
        (time) => time.day === day && time.range === range
      );

      if (isAlreadySelected) {
        setSelectedTimes((prevTimes) =>
          prevTimes.filter((time) => time.day !== day || time.range !== range)
        );
      } else {
        setSelectedTimes((prevTimes) => [...prevTimes, selectedTimeSlot]);
      }
    } else {
      return;
    }

    // Check if the time slot is already selected, and remove it from the state
  };

  const isTimeSelected = (day, range) => {
    return selectedTimes.some(
      (time) => time.day === day && time.range === range
    );
  };

  const [editCalendar, setEditCalendar] = useState(false);
  const handleEditCalendar = () => {
    setEditCalendar((prev) => !prev);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    dispatch(aboutActions.updatedAbout({ description: descriptionValue }));
    setEditDescription(false);
  };

  const handleCalendarEdition = () => {
    // e.preventDefault()
    dispatch(
      aboutActions.updatedAbout({
        description: descriptionValue,
        selectedTime: selectedTimes,
      })
    );
    setEditCalendar(false);
  };
  return (
    <div className="h-full sm:px-20  overflow-x-hidden">
      <div className="bg-white w-[100%]">
        <div className="w-full border-b-2 py-5 sm:px-20 ss:px-[5%]">
          <h1 className="text-[#9E6F27] font-extrabold text-xl">About</h1>
        </div>
        <div>
          <div className="flex flex-row relative py-5  items-center  border-b-2">
            {editDescription ? (
              <>
                {" "}
                <div className=" px-[5%] border-b py-2  ss:w-full flex flex-col">
                  <form
                    className="sm:px-[5%] py-5 flex ss:flex-col  md:flex-row md:justify-between gap-23"
                    onSubmit={handleSubmission}
                  >
                    <div className="flex flex-col gap-3 ss:w-full md:w-9/12">
                      <label htmlFor="description" className="text-[#555]">
                        Description
                      </label>
                      <input
                        type="text"
                        id="description"
                        className="h-24 px-3 ss:mb-4 sm:mb-0 text-[#555] border w-full rounded-lg"
                        defaultValue={descriptionValue}
                        onChange={(e) => setDiscription(e.target.value)}
                      />
                    </div>
                    <div className="align-baseline md:self-end flex ss:flex-col md:flex-row gap-6">
                      <input
                        type="submit"
                        value="Save"
                        className="px-10 bg-[#9E6F27] sm:ml-[4%] hover:bg-[#825E27] text-white py-1 rounded-xl hover:cursor-pointer"
                        onClick={handleOpenDescription}

                      />
                      <button
                        onClick={handleOpenDescription}
                        className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className="px-20">
                  <p>{descriptionValue}</p>
                </div>
              </>
            )}

            <div className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1 absolute right-2 top-2">
              <BsPencilFill
                size={20}
                color="white"
                className="hover:cursor-pointer"
                onClick={handleOpenDescription}
              />
            </div>
          </div>

          <div className="flex ss:flex-col - gap-8  py-5 ss:pl-[5%]">
            <div className="relative flex md:flex-row ss:flex-col ">
              <h1 className="text-xl font-bold">Availability</h1>
              <div className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1  absolute right-2 top-2">
                <BsPencilFill
                  size={20}
                  color="white"
                  className="hover:cursor-pointer"
                  onClick={handleEditCalendar}
                />
              </div>
            </div>
            <div>
              <div className="flex w-[80%] bg-blackflex-col  md:flex-row  ss:flex-col  md:justify-between ">
                <div className="container ss:min-w-full sm-w-[80%]">
                  <div className="grid grid-cols-8 gap-0  ">
                    {/* Empty cell for the top-left corner */}
                    <div className="border"></div>  

                    {/* Render days of the week */}
                    {daysOfWeek.map((day) => (
                      <div key={day} className="border text-center p-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Render hours ranges */}
                  {hoursRanges.map((range, index) => (
                    <>
                      <div key={range} className="grid grid-cols-8 gap-0">
                        <div className="text-center p-2 border">{range}</div>

                        {/* Render time slots for each day */}
                        {daysOfWeek.map((day, dayIndex) => (
                          <div
                            key={dayIndex}
                            className={`p-2 cursor-pointer ${
                              isTimeSelected(dayIndex, range)
                                ? "bg-[#9E6F27]"
                                : ""
                            } border-b-2 border-r-2`}
                            onClick={() => handleTimeClick(dayIndex, range)}
                          >
                            {/* Empty square */}
                          </div>
                        ))}
                      </div>
                    </>
                  ))}
                  <div className="flex justify-center items-center md:flex-row mt-5 gap-5 ss:flex-col ">
                    <p>In your timezone (UTC -04:00)</p>
                    {editCalendar && (
                      <div className="align-baseline sm:self-center flex flex-row gap-5 ">
                        <input
                          type="submit"
                          value="Save"
                          className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl hover:cursor-pointer"
                          onClick={handleCalendarEdition}
                        />
                        <button
                          className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                          onClick={() => setEditCalendar(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col sm:justify-start  sm:pl-[4%] ss:pl-[20%]">
                  <p>Next Available Time : 12:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
