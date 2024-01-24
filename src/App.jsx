import { useEffect} from 'react'
import './App.css'
import {useDispatch, useSelector} from 'react-redux'
import {setPosts, selectPosts, setCurrentPage, removePost} from './postSlice'

function App() {
  const dispatch = useDispatch();
  const {data: posts, loading, currentPage} = useSelector(selectPosts)

  const getCurrentPagePosts =()=>{
    const startIndex = (currentPage-1) * 6;
    const endIndex = startIndex + 6;
    return posts.slice(startIndex, endIndex)
  }

  const removeCard=(postId)=>{
    const removedCardIndex = posts.findIndex((post)=>post.id ===postId);
    
    dispatch(removePost(postId))
    

    const newCurrentPage = Math.ceil((removedCardIndex+1)/6)
    if(removedCardIndex ===posts.length-1 && newCurrentPage>1){
      dispatch(setCurrentPage(newCurrentPage-1))
    }else{
      dispatch(setCurrentPage(newCurrentPage))
    }
  }

  const handlePageClick = (pageNumber)=>{
    dispatch(setCurrentPage(pageNumber))
  }

  const totalPages =Math.ceil(posts.length /6)
  const pageNumbers = Array.from({length:totalPages}, (_,index)=>index+1)

  useEffect(()=>{
    const fetchData = async()=>{
      const response = await fetch("https://jsonplaceholder.typicode.com/posts")
      const postData = await response.json();
      dispatch(setPosts(postData));
    };
  
  setTimeout(()=>{
    fetchData()
  },5000) },[dispatch])
  
  return (
    <>
      <div className='App'>
        {loading ? (<h1>Loading....</h1>):(
          <div className='posts'>
              {getCurrentPagePosts().map((post)=>{
                return(
                  <div key={post.id}>
                  <div className='PostCard'>
                 <div className='PostButton'>
                 <h2>{post.title}</h2>
                <button className='RemoveButton' onClick={()=>removeCard(post.id)}>X</button>
                </div>   
                <p>{post.body}</p>
              </div>
              </div>
                )
              })}        
            </div>
          )}

          <div className='posts Pagination'>
              {pageNumbers.map((pageNumber)=>(
                <button key={pageNumber} onClick={()=>handlePageClick(pageNumber)} className={pageNumber === currentPage ? 'active' : ''}>
                  {pageNumber}
                </button>
              ))}
          </div>
          </div>
        
      
    </>
  )
}

export default App
