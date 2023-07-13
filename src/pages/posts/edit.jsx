//import useState
import { useState, useEffect } from "react";

//import useNavigate
import { useNavigate, useParams } from "react-router-dom";

//import API
import axios from "../../axios";

export default function PostEdit() {
  //define state
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [errors, setErrors] = useState([]);

  //useNavigate
  const navigate = useNavigate();

  //destruct ID
  const { id } = useParams();

  //method fetchDetailPost
  const fetchDetailPost = async () => {
    //fetch data
    await axios.get(`/posts/${id}`).then((response) => {
      //assign to state
      setTitle(response.data.data.title);
      setContent(response.data.data.content);
    });
  };

  //hook useEffect
  useEffect(() => {
    //call method "fetchDetailPost"
    fetchDetailPost();
  }, []);

  //method handle file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  //method update post
  const updatePost = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("_method", "PUT");

    //send data with API
    await axios
      .post(`/posts/${id}`, formData)
      .then(() => {
        //redirect to posts index
        navigate("/posts");
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card w-full bg-base-300 text-primary-content shadow">
            <div className="card-body">
              <form onSubmit={updatePost}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Image</label>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="form-control w-full file-input file-input-bordered file-input-info w-full max-w-xs"
                  />
                  {errors.image && (
                    <div className="alert alert-danger mt-2">
                      {errors.image[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Title</label>
                  <input
                    type="text"
                    className="form-control input input-bordered input-info w-full max-w-xs"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title Post"
                  />
                  {errors.title && (
                    <div className="alert alert-danger mt-2">
                      {errors.title[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Content</label>
                  <textarea
                    className="form-control textarea textarea-info"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    placeholder="Content Post"
                  ></textarea>
                  {errors.content && (
                    <div className="alert alert-danger mt-2">
                      {errors.content[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-info rounded-sm shadow border-0"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
