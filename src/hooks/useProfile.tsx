import { useEffect, useState } from "react"
import { getDatabase, ref, get, child } from "firebase/database"
import { IProfile } from "../interfaces/profile"

export const useProfile = ({ id }: { id: string }) => {
  const [fetching, setFetching] = useState(false)
  const [profile, setProfile] = useState<IProfile>()

  const fetchProfile = () => {
    setFetching(true)
    const database = getDatabase()
    get(child(ref(database), `/profile/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.val());
      }
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setFetching(false)
    })
  }

  useEffect(() => {
    fetchProfile()
  }, [id])

  return {
    profile,
    fetching,
    fetchProfile
  }
}
