import React, { useState, useEffect } from 'react'
import Header from '../header/header'
import LoginCommonLayout from '../login-commonlayout/login-commonlayout'
import { getLocalStorage } from '../../core/localStorageService'

// import { useAppSelector } from '../../store/hooks';
import { getGlobalDataAsync } from '../../store/modules/globalData'
import { useAppDispatch } from '../../store/hooks';

export default function CommonLayout() {
    const token = getLocalStorage('token') ? getLocalStorage('token') : '';
    const [hideHeader, setHideheader] = useState(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if(token){
            getGloblaData();
        }
        if (window.location.href.indexOf("recoverypassword") > -1) {
            setHideheader(true)
        }
        

	}, [])

    async function getGloblaData(){
        await dispatch(getGlobalDataAsync())
    }

    useEffect(() => {
        const handleInvalidToken = (e:any) => {
            // console.log(e)
            if (e.key === null && e.newValue === e.oldValue) {
            if(!getLocalStorage('token')){
                window.location.reload()
            }
          }
        }
        window.addEventListener('storage', handleInvalidToken)
        return function cleanup() {
          window.removeEventListener('storage', handleInvalidToken)
        }
      }, [])
    

    
    
    // const data = useAppSelector((state) => state.globalData);
    // console.log(data.permissions)

	if (token && !hideHeader) {
		return <LoginCommonLayout />
	}
    //  else if (!token) {
	// 	return <Header />
	// }
     else {
		return null
	}
}