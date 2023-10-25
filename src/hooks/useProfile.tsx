import { useState } from "react"
import { getDatabase, ref, get, child } from "firebase/database"
import { useDispatch } from "react-redux"
import { updateProfile } from "../reducers/profile"

export const useProfile = () => {
  const dispatch = useDispatch()
  const [fetching, setFetching] = useState(false)

  const fetchProfile = (id?: string) => {
    if (!id) return
    setFetching(true)
    const database = getDatabase()
    get(child(ref(database), `/profile/${id}`)).then((snapshot) => {
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
