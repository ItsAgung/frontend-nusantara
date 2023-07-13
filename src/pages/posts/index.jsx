//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import axios from "../../axios";

//import Link
import { Link } from "react-router-dom";

export default function PostIndex() {
  //ini state
  const [posts, setPosts] = useState([]);

  //define method
  const fetchDataPosts = async () => {
    //fetch data from API with Axios
    await axios.get("/posts").then((response) => {
      //assign response data to state "posts"
      setPosts(response.data.data.data);
    });
  };

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDataPosts"
    fetchDataPosts();
  }, []);

  //method deletePost
  const deletePost = async (id) => {
    //delete with api
    await axios.delete(`/posts/${id}`).then(() => {
      //call method "fetchDataPosts"
      fetchDataPosts();
    });
  };

  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="row">
          <div className="col-md-12">
            <Link
              to="/posts/create"
              className="btn btn-md btn-info rounded shadow border-0 mb-3"
            >
              ADD NEW POST
            </Link>
                <div className="overflow-x-auto">
                  <table className="table bg-secondary-content text-black">
                    {/* head */}
                    <thead className="text-black">
                      <tr>
                        <th>Images</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.length > 0 ? (
                        posts.map((post, index) => (
                          <tr key={index}>
                            <td className="text-center">
                              <img
                                src={post.image}
                                alt={post.title}
                                width="100"
                                className="rounded"
                              />
                            </td>
                            <td>{post.title}</td>
                            <td>{post.content}</td>
                            <td className="text-center">
                              <Link
                                to={`/posts/edit/${post.id}`}
                                className="btn btn-sm btn-primary rounded-lg shadow border-0 me-2"
                              >
                                EDIT
                              </Link>
                              <button
                                onClick={() => {
                                  if (window.confirm("Delete the item?")) {
                                    deletePost(post.id);
                                  }
                                }}
                                className="btn btn-sm btn-danger rounded-lg shadow border-0"
                              >
                                DELETE
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            <div className="alert alert-danger mb-0">
                              Data Belum Tersedia!
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

    </>
  );
}
