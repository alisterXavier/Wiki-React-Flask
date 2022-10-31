import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Image from "next/image";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const url = "http://localhost:5000"

function Search() {
  const router = useRouter();
  const [dump, setDump] = useState();
  const [imgs, setImgs] = useState();
  const { content } = router.query;

  async function ContentImages() {
    const data = await axios.get(
      `${url}/get-imgs?content=${content}`
    );
    setImgs(data.data.images);
  }

  async function Content() {
    ContentImages();
    const data = await axios.get(
      `${url}/search?content=${content}`
    );
    setDump(data.data);
  }

  useEffect(() => {
    if (content) Content()
  }, [content]);

  const WikiImgDump = () => (
    <div className="flex flex-col justify-center items-center">
      {imgs.map((i) => (
        <figure className="relative my-2">
          <Image src={i} width={400} height={200} />
        </figure>
      ))}
    </div>
  );
  const WikiDump = () =>
    Object.keys(dump).map((d) => (
      <>
        {d !== "header" && (
          <h1 className="main-title title relative text-2xl my-5">
            {d.replaceAll("=", "")}
          </h1>
        )}
        {dump[d].map((item) => {
          return (
            <>
              {typeof item == "object" ? (
                <div>
                  {Object.keys(item).map((iKey) => (
                    <>
                      <h1 className="text-xl title my-2">
                        {iKey.replaceAll("=", "")}
                      </h1>
                      {item[iKey].map((i) => (
                        <p className={`${i.length < 0 && "my-5"}`}>{i}</p>
                      ))}
                    </>
                  ))}
                </div>
              ) : (
                <p>{item}</p>
              )}
            </>
          );
        })}
      </>
    ));

  return (
    <div className="flex">
      <nav className="navigation"></nav>
      {dump && (
        <>
          <div className="content-container w-full px-5">
            <header>
              <h1 className="relative text-4xl title">
                {router.query.content}
              </h1>
            </header>
            {WikiDump()}
          </div>
        </>
      )}
      <div className="">
        {imgs && WikiImgDump()}
      </div>
    </div>
  );
}

export default Search;
