import { useEffect, useState } from "react"
import { useLazyGetSummaryQuery } from "../services/article";

import {loader} from "../assets"

const Demo = () => {
const [article, setArticle] = useState({
    url:'',
    summary:'',
});


useEffect(() => {
   const articlesFromLS = JSON.parse(localStorage.getItem('articles'))
  
   if(articlesFromLS){
    setAllArticles(articlesFromLS)
   }

},[]);

const [allArticles , setAllArticles] = useState([]);



const handleSubmit = async(e) => {

  e.preventDefault();

  const { data } = await getSummary({ articleUrl: article.url });
  if (data?.summary) {
    const newArticle = { ...article, summary: data.summary };
    
    const updatedAllArticles = [newArticle , ...allArticles];

    setAllArticles(updatedAllArticles);

  setArticle(newArticle);
   

  localStorage.setItem('articles', JSON.stringify(updatedAllArticles));
}
}

const [getSummary ,  { error, isFetching }] = useLazyGetSummaryQuery();


  return (
    <section className="mt-16 w-full max-w-xl "> 
    <div className="flex flex-col w-full gap-2 justify-between">
        <form className="relative flex justify-around items-center" onSubmit={handleSubmit}>
          

          <input type="url" placeholder="Type your url" value={article.url} onChange={(e) => setArticle({...article, url:e.target.value})} required  className="w-full px-5 py-5 border-0 peer"/>

          <button type="submit" className="rounded-md bg-sky-500 text-white px-5 py-5 mx-5 peer-focus:bg-white peer-focus:text-green-600" >
              Submit
          </button>
        </form>

      </div>
      <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
          <img src={loader} alt='loader' className='w-24 h-24 object-contain' />
        ) : error ? (
          <p className='font-inter font-bold text-black text-center'>
            Well, that was not supposed to happen...
            <br />
            <span className=' font-normal text-gray-700'>
              {error?.data?.error}
            </span>
          </p>
        ) : (
          article.summary && (
            <div className='flex flex-col gap-3'>
              <h2 className="font-inter font-bold ">Article <span className="text-blue-500 underline decoration-sky-700 ">Summary </span></h2>
              <div className="rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-4"> 
              <p className="font-inter font-medium text-sm text-white">{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>

      

    </section>
  )
}

export default Demo