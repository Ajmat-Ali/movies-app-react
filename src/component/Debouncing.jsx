import styles from "../styles/Debouncing.module.css";

function Debouncing({ searchData, debouncedSearchTerm }) {
  if (searchData === null || debouncedSearchTerm === "") {
    return "";
  } else if (!searchData || searchData.length === 0) {
    return <p className={styles.message}>No Movies Found</p>;
  }
  return (
    <div className={styles.display_data}>
      <div>
        {searchData &&
          searchData.map((ele, ind) => {
            return (
              <div key={ind}>
                <img src={ele.Poster} alt="" />
                <p>Title : {ele.Title}</p>
                <p>Type: {ele.Type}</p>
                <button className="btn btn-primary">Play Now</button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Debouncing;
