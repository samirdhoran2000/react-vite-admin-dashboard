import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const UploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [object, setObject] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetctObjects();
  }, []);

  const fetctObjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/list-objects`
      );

      setObject(res.data.objects);
      console.log(res.data.objects);
      setLoading(false);
    } catch (e) {
      console.log("error in fetching objects ", e);
      setLoading(false);
    }
  };
  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length > 0) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("avatar", selectedFiles[i]);
      }

      setLoading(true);
      try {
        // const Sel = Array.from(selectedFiles);
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        //   console.log('selected files data ', Sel);
        console.log("error form succedss ", response.data);
        console.log("File uploaded successfully:", response.data);
        fetctObjects();
        setLoading(false);
        toast.success("File uploaded successfully!");
      } catch (error) {
        setLoading(false);
        toast.error(
          "Error : " +
            error.response?.data?.message +
            ": " +
            error.response?.data?.file
        );
        console.log("Error : ", error);
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "1",
          height: "1",
          p: 1,
          m: 1,
          fontSize: "0.875rem",
          fontWeight: "700",
          display: "flex",
          justifyContent: "space-between",
          //   flexDirection: "column",
          //   alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "rgb(255, 255, 255)",
                      borderRadius: "10px",
            overflowY: "auto",
            // display: "flex",
            // justifyContent: "center",
            //           alignItems: "center",
            // flexWrap: "wrap",
            // padding: "30px",
            // overflow: "hidden",
          }}
        >
          <ul
            style={{
            //   width: "100%",
            //   height: "400px",
            //   backgroundColor: "rgb(255, 255, 255)",
            //   borderRadius: "10px",
              display: "flex",
              // justifyContent: "center",
              //           alignItems: "center",
              flexWrap: "wrap",
                          padding: "30px",
              // overflow: "hidden",
            }}
          >
            {object.map((file, index) => (
              <li
                key={index}
                style={{
                  borderBottom: "1px solid black",
                  marginBottom: "5px",
                  paddingBottom: "5px",
                  width: "235px",
                  height: "50px",
                  wordWrap: "break-word",
                  margin: "5px 10px",
                }}
              >
                {" "}
                <span
                  style={{
                    marginRight: "5px",
                  }}
                >
                  {index + 1}. ) -{" "}
                </span>{" "}
                {file}
              </li>
            ))}
          </ul>
        </Box>
        <Box
          sx={{
            //   marginTop: "20px",
            display: "flex",
          }}
        >
          <Box sx={{ margin: "10px 20px", width: "100%", textAlign: "center" }}>
            {selectedFiles.length > 0 && (
              <ul>
                {Array.from(selectedFiles).map((file, index) => (
                  <li
                    key={index}
                    style={{
                      borderBottom: "1px solid black",
                      marginBottom: "5px",
                      paddingBottom: "5px",
                    }}
                  >
                    {" "}
                    <span
                      style={{
                        marginRight: "5px",
                      }}
                    >
                      {index + 1}. ) -{" "}
                    </span>{" "}
                    {file.name}
                  </li>
                ))}
              </ul>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <form
              encType="multipart/form-data"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <input
                accept=".csv, .xlsx"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleFileChange}
                style={{ display: "none" }}
                name="avatar"
              />
              <label htmlFor="contained-button-file">
                <Button
                  component="span"
                  // variant="contained"
                  sx={{ fontSize: 14 }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "200px",
                      height: "200px",
                      borderRadius: "10px",
                      backgroundColor: "#43a7ff",
                      color: "white",
                      fontSize: "100px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.16)",
                      transition: "box-shadow 0.3s ease-in-out",
                      "&:hover": {
                        boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.392)",
                      },
                    }}
                  >
                    +
                  </div>
                </Button>
              </label>
              <Button
                variant="contained"
                color="primary"
                onClick={handleUpload}
                sx={{ marginLeft: "10px", fontSize: 14 }}
              >
                Submit
              </Button>
            </form>
          </Box>

          {/* <ToastContainer/> */}
          {loading && <Spinner />}
        </Box>
      </Box>
      {/* <h1
        onClick={() => {
          toast.info("This is a toast info.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          }}
      >
    
      </h1> */}
    </>
  );
};

export default UploadFile;
