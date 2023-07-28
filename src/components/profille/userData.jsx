import { BsPencilFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, Fragment, useEffect } from "react";
import { countries } from "countries-list";
import { Combobox, Transition } from "@headlessui/react";
import { City, Country } from "country-state-city";
import {
  userActions,
  userCredentials,
} from "../../store/slices/userCredentials";
import { HandleEditProfile } from "../../helpers/editProfile";
const UserData = () => {
  const state = useSelector((state) => state);
  const [editProfile, setEditProfile] = useState(false);
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.logged.userData);
  const [latestUserCredentials, setLatestUserCredentials] = useState(
    useSelector((state) => state.userCredentials)
  );

  const countryOne = useSelector(
    (state) => state.logged.userData.profile.country
  );
  let countryOriginal;
  if (!countryOne.includes("No ")) {
    countryOriginal = JSON.parse(countryOne);
  } else {
    countryOriginal = countryOne;
  }
  const addingAllData = (userData) => {
    const {
      user: { _id, email: userEmail },
      profile: {
        profilePicture,
        hourlyRates,
        phoneNumber: userPhoneNumber,
        openToCollaborate,
        country: userCountry,
      },
    } = userData;

    dispatch(
      userActions.updateUserData({
        username: userData.user.name,
        id: _id,
        email: userEmail,
        phoneNumber: userPhoneNumber,
        openToCollabrate: openToCollaborate,
        hoursRate: hourlyRates,
        countryInfo: countryOriginal,
        profilePicture: userData.profile.profilePicture,
        backgroundPicture: userData.profile.backgroundPicture,
        skills: userData.profile.tutorSkills,
        title: userData.profile.title,
      })
    );
  };

  useEffect(() => {
    if (userData != null) {
      addingAllData(userData);
    }
  }, [userData]); // Add userData as a dependency to the useEffect hook

  const {
    username,
    id,
    title,
    skills,
    hoursRate,
    countryInfo,
    email,
    phoneNumber,
    openToCollabrate,
  } = useSelector((state) => state.userCredentials);
  useEffect(() => {
    if (editProfile) {
      setName(username);
      setTitleValue(title);
      setSkillsValue(skills);
    }
  }, [editProfile, username, title, skills]);

  const [Name, setName] = useState(username);
  const [titleValue, setTitleValue] = useState(title);
  const [skillsValue, setSkillsValue] = useState(skills);
  const [hoursRateValue, setHoursRateValue] = useState(hoursRate);
  const [countryNameValue, setCountryNameValue] = useState(
    userData?.countryInfo?.countryName
  );
  const [countryCode, setCountryCode] = useState(
    userData?.countryInfo?.code || "No Country"
  ); // Updated state for country code
  const [countryCities, setCountryCities] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const [cityDetails, setCityDetails] = useState({});
  const [emailValue, setEmailNameValue] = useState(userData.user.email);
  const [phoneNumberValue, setPhoneNameValue] = useState(userData.profile.phoneNumber);
  const [timeValue, setTimeValue] = useState("");
  const [openToCollabrateValue, setOpenToCollabrateValue] =
    useState(openToCollabrate);
  const [flagValue, setFlagValue] = useState(countryOriginal.flag);
  const handleEditProfile = () => {
    setEditProfile((prev) => !prev);
  };

  const [countryList, setCountryList] = useState([]);
  const [query, setQuery] = useState("");
  // Extract country names and flags from the countries object
  const countries = Country.getAllCountries();
  const countriesData = countries.map((country) => ({
    name: country.name,
    flag: country.flag,
    code: country.isoCode,
  }));
  useState(() => {
    setCountryList(countriesData);
  }, []);

  // cities
  const fetchCitiesOfCountry = (countryCode) => {
    const citiesOfCountry = City.getCitiesOfCountry(countryCode);
    const first20Cities = citiesOfCountry.slice(0, 20);
    setCountryCities(first20Cities);
  };

  useEffect(() => {
    if (countryCode) {
      fetchCitiesOfCountry(countryCode);
    }
  }, [countryCode]);
  const filteredCountries =
    query === ""
      ? countryList
      : countryList.filter((country) =>
          country.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        );
  const filteredCities =
    query === ""
      ? countryCities
      : countryCities.filter((city) =>
          city.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
        );

  const latitude = cityDetails?.latitude;
  const longitude = cityDetails?.longitude;
  const timezone = cityDetails?.name;
  // time
  useEffect(() => {
    async function getLocalTime(latitude, longitude, timezone) {
      try {
        // Convert latitude and longitude to numbers
        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        // Get the current time in UTC
        const utcTime = new Date().toISOString();

        // Create an instance of DateTimeFormat for the specified timezone
        const options = {
          timeZone: timezone,
          timeZoneName: "short",
        };
        const localTime = new Intl.DateTimeFormat("en-US", options).format(
          new Date(utcTime)
        );

        // Return the local time with the timezone offset
        return localTime;
      } catch (error) {
        console.error("Error fetching local time:", error.message);
        return null;
      }
    }
    getLocalTime(latitude, longitude, timezone).then((localTime) => {
      setTimeValue(localTime);
    });
  }, [latitude, longitude, timezone]);

  const handleSubmition = async (e) => {
    e.preventDefault();

   dispatch(
      userActions.updateUserData2({
        username: Name,
        title: titleValue,
        skills: skillsValue,
        hoursRate: hoursRateValue,
        countryInfo: {
          countryName: countryNameValue,
          flag: flagValue,
          city: cityDetails[0].name,
          time: timeValue,
        },
        email: emailValue,
        phoneNumber: phoneNumberValue,
        openToCollabrate: openToCollabrateValue,
      })
    );
    

    // Use the updated state values directly in the API call
    const name = Name;
    const about = state.aboutData.description;
    const education = state.formData.education;
    const certificate = state.formData.certificate;
    const experience = state.formData.experience;
    const tutorialSkills = skillsValue;
    const title=titleValue
    const invetions = state.formData.inventions;
    const patents = state.formData.patents;
    const hourlyRates = hoursRateValue; // Use the updated state value
    const country = {
      countryName: countryNameValue,
      flag: flagValue,
      city: cityDetails[0]?.name || "no city", // Add a default value for the city
      time: timeValue,
    };
    const phoneNumber = phoneNumberValue;
    const openToCollaborate = openToCollabrateValue;

    const backgroundPicture = state.userCredentials.backgroundPicture;
    const availability = state.aboutData.selectedTime;
    const token = JSON.parse(localStorage.getItem("userData")).token;

    const dd = await HandleEditProfile({
      about,
      certificate,
      experience,
      education,
      tutorialSkills,
      invetions,
      patents,
      hourlyRates,
      country,
      phoneNumber,
      openToCollaborate,
      backgroundPicture,
      availability,
      token,
      name,
      title
    });
    setEditProfile(false);
    //  all data
  };

  return (
    <div className="h-full sm:px-20 overflow-hidden  ">
      <div className="relative w-full h-40 ">
        <img
          src={
            userData ? userData.profile.backgroundPicture : "/assets/codes.png"
          }
          alt="codes image"
          className="absolute inset-0 w-full h-full object-cover rounded-t-lg r"
        />
        <div className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1 absolute right-2 top-2">
          <BsPencilFill size={20} color="white" />
        </div>
      </div>
      <div className="absolute ss:top-[20%] sm:left-[13%] md:left-[10%] ss:left-[10%]  flex flex-row  justify-center items-center">
        <img
          src={userData ? userData.profile.profilePicture : "/assets/codes.png"}
          alt="user image"
          className="object-cover w-28  rounded-full h-28 "
        />
        <div className="bg-[#9E6F27] flex justify-center items-center rounded-full p-1">
          <BsPencilFill
            size={20}
            color="white"
            className="hover:cursor-pointer"
          />
        </div>
      </div>
      <div className="bg-white  flex justify-center pt-20 px-[5%]     flex-col flex-wrap gap-10 rounded-b-md border-b-2 pb-5">
        {editProfile ? (
          <>
            <div>
              <form className="flex flex-col gap-5" onSubmit={handleSubmition}>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="Name" className="text-[#555]">
                      Name
                    </label>
                    <input
                      type="text"
                      id="Name"
                      value={Name}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="title" className="text-[#555]">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={titleValue}
                      onChange={(e) => setTitleValue(e.target.value)}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="skills" className="text-[#555]">
                      Tutor Skills ( Please separate them by comma )
                    </label>
                    <input
                      type="text"
                      id="skills"
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      value={skillsValue}
                      onChange={(e) => setSkillsValue(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="hoursRate" className="text-[#555]">
                      HourlRate
                    </label>
                    <input
                      type="number"
                      id="hoursRate"
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      value={hoursRateValue}
                      onChange={(e) => setHoursRateValue(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="country" className="text-[#555]">
                      Country
                    </label>
                    <div>
                      <Combobox
                        onChange={(selectedCountry) => {
                          setCountryNameValue(selectedCountry[1]);
                          setFlagValue(selectedCountry[0]);
                          setCountryCode(selectedCountry[2]);
                        }}
                      >
                        <div className="relative">
                          <Combobox.Input
                          required
                            displayValue={(country) => {
                              return country[0] + "  " + country[1];
                            }}
                            onChange={(e) => {
                              setQuery(e.target.value);
                              setCountryNameValue(e.target.value);
                              setFlagValue(e.target.value);
                            }}
                            className="border-2 rounded-t-md py-1 w-8/12 px-2 text-[#555] pr-8" // Add 'pr-8' for right padding
                          />

                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-10"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")} // Clear the query after the transition
                          >
                            <Combobox.Options className="border-b border-l border-r border-black w-8/12">
                              {filteredCountries.map((country) => (
                                <Combobox.Option
                                  key={country.name}
                                  className={({ active }) =>
                                    `relative   border-b py-2 px-2  ${
                                      active
                                        ? "bg-primary-blue text-[#555] cursor-pointer"
                                        : ""
                                    }`
                                  }
                                  value={[
                                    country.flag,
                                    country.name,
                                    country.code,
                                  ]}
                                >
                                  <span className="flex items-center">
                                    <span className="mr-2">{country.flag}</span>
                                    <span>{country.name}</span>
                                  </span>
                                </Combobox.Option>
                              ))}
                            </Combobox.Options>
                          </Transition>
                        </div>
                      </Combobox>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="city" className="text-[#555]">
                      City
                    </label>
                    <Combobox
                      onChange={(selectedCity) => {
                        setCityDetails(selectedCity);
                        setSelectCity(selectedCity[0]);
                      }}
                    >
                      <div className="relative">
                        <Combobox.Input
                        required
                          value={selectCity ? selectCity.name : ""}
                          displayValue={(city) => {
                            return city.name;
                          }}
                          onChange={(e) => {
                            setQuery(e.target.value);
                          }}
                          className="border-2 rounded-t-md py-1 w-8/12 px-2 text-[#555] pr-8" // Add 'pr-8' for right padding
                        />

                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-10"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQuery("")} // Clear the query after the transition
                        >
                          <Combobox.Options className="border-b border-l border-r border-black w-8/12">
                            {filteredCities.map((city) => (
                              <Combobox.Option
                                key={`${city.stateCode}-${city.name}`} // Use both stateCode and name for a unique key
                                className={({ active }) =>
                                  `relative   border-b py-2 px-2  ${
                                    active ? " text-[#555] cursor-pointer" : ""
                                  }`
                                }
                                value={[city]}
                              >
                                <span className="flex items-center">
                                  <span>{city.name}</span>
                                </span>
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[#555]">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={emailValue}
                      onChange={(e) => setEmailNameValue(e.target.value)}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phoneNumber" className="text-[#555]">
                      Phone number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      value={phoneNumberValue}
                      onChange={(e) => setPhoneNameValue(e.target.value)}
                      className="border-2 rounded-md py-1 w-8/12 px-2 text-[#555]"
                    />
                  </div>
                </div>

                <div className="flex sm:flex-row ss:flex-col sm:justify-between ss:gap-3">
                  <div className="flex flex-row gap-3 items-center">
                    <input
                      type="radio"
                      id="collaborate"
                      checked={openToCollabrateValue}
                      onChange={() => setOpenToCollabrateValue((prev) => !prev)}
                    />
                    <label htmlFor="collaborate" className="text-[#555]">
                      Open to Collaborate
                    </label>
                  </div>

                  <div className="align-baseline sm:self-end flex sm:flex-row  ss:gap-5">
                    <input
                      type="submit"
                      value="Save"
                      className="px-10 bg-[#9E6F27] hover:bg-[#825E27] text-white py-1 rounded-xl"
                    />
                    <button
                      onClick={handleEditProfile}
                      className="px-10 hover:bg-[#EDE4CE] border-2 border-[#9E6F27] text-[#9E6F27] py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div>
              <div>
                <div className="flex sm:flex-row ss:flex-col sm:justify-between ss:gap-3">
                  <div className="flex flex-row gap-2 items-center">
                    <h1 className="text-[#9E6F27] text-xl">{username}</h1>
                    <p>{countryInfo?.flag || "🇨🇦"}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    {openToCollabrate && (
                      <button className="bg-[#64B94F] px-5 py-2 rounded-md">
                        Open to Collaborate
                      </button>
                    )}

                    <div className="bg-[#9E6F27] flex justify-center items-center rounded-full px-2 py-1 self-end">
                      <BsPencilFill
                        size={20}
                        color="white"
                        onClick={handleEditProfile}
                        className="hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <p>{id}</p>
              </div>
              <div>
                <p>{title}</p>
              </div>
              <div className="flex flex-col  gap-3 mb-5">
                <p>{skills}</p>
                <p>
                  <span>{countryInfo?.countryName}</span>{" "}
                  <span>{countryInfo?.city}</span>
                </p>
                <p>{email}</p>
                <p>{phoneNumber}</p>
              </div>
              <div className="flex md:flex-row ss:flex-col justify-between gap-3  ">
                <div className="flex md:flex-row ss:flex-col  gap-6 md:self-center  ">
                  <button className="border-2 border-[#9E6F27]  align-middle px-7 text-[#9E6F27] hover:bg-[#EDE4CE]  rounded-2xl h-12">
                    Share
                  </button>
                  <button className="border-2 border-[#9E6F27]  align-middle px-7 text-[#9E6F27] bg-[#FFEAB2] hover:bg-[#FFDD87] py-2 rounded-2xl h-12">
                    Favorite
                  </button>
                  <button className="border-2 border-[#9E6F27]  align-middle px-7 text-white bg-[#9E6F27] hover:bg-[#825E27] py-2 rounded-2xl h-12">
                    Message
                  </button>
                </div>
                <div className="flex flex-col  sm:self-baseline ss:gap-4">
                  <button className="bg-[#009ED0] text-white px-5 py-2 rounded-md">
                    Hourly Rate : {hoursRate}USR
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserData;
