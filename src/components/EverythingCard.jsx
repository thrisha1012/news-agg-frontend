import React from "react";
import axios from "axios";

function Card(props) {
  const handleSave = async () => {
    const token = localStorage.getItem('token'); // Get the JWT token from localStorage
    if (!token) {
      alert("Please log in to save articles.");
      return;
    }

    const articleData = {
      title: props.title,
      imgUrl: props.imgUrl,
      description: props.description,
      url: props.url,
      source: props.source,
      author: props.author,
      publishedAt: props.publishedAt,
    };

    try {
      const response = await axios.post(
        'http://localhost:3000/save-article',
        articleData,
        {
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token in the header
          },
        }
      );
      alert("Article saved successfully!");
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save the article.");
    }
  };

  return (
    <div className="everything-card mt-10">
      <div className="everything-card flex flex-wrap p-5 gap-1 mb-1">
        <b className="title">{props.title}</b>
        <div className="everything-card-img mx-auto">
          <img className="everything-card-img" src={props.imgUrl} alt="img" />
        </div>
        <div className="description">
          <p className="description-text leading-7">
            {props.description?.substring(0, 200)}
          </p>
        </div>
        <div className="info">
          <div className="source-info flex items-center gap-2">
            <span className="font-semibold">Source:</span>
            <a
              href={props.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link underline break-words"
            >
              {props.source.substring(0, 70)}
            </a>
          </div>
          <div className="origin flex flex-col">
            <p className="origin-item">
              <span className="font-semibold">Author:</span>
              {props.author}
            </p>
            <p className="origin-item">
              <span className="font-semibold">Published At:</span>
              ({props.publishedAt})
            </p>
          </div>
        </div>
      <button 
        className="save-button bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleSave}
      >
        Save
      </button>
      </div>
    </div>
  );
}

export default Card;
