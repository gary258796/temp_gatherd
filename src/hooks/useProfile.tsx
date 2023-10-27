import { useState } from "react"
import { getDatabase, ref, get, child } from "firebase/database"
import { useDispatch } from "react-redux"
import { updateProfile } from "../reducers/profile"

export const useProfile = () => {
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(false)

  const fetchProfile = (id?: string) => {
    const account = id || localStorage.getItem('userAccount')
    if (!account) return
    setFetching(true)
    const database = getDatabase()
    get(child(ref(database), `/profile/${account}`)).then((snapshot) => {
      if (snapshot.exists()) {
        dispatch(updateProfile(snapshot.val()))
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setFetching(false)
    })
  }

  return {
    fetching,
    fetchProfile
  }
}
