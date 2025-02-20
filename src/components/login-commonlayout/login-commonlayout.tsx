import React, { useContext } from 'react'
import Loginheader from '../login-header'
import { AuthContext } from '../../providers/auth'
import CustomerLoginheader from '../customer-login-header/customer-login-header';
import SalesHeader from '../sales-header/sales-login-header';

const LoginCommonLayout = () => {
	const { userInfo }: any = useContext(AuthContext);


	return (
		<>{userInfo && userInfo.code === "admin" && <Loginheader />
			|| userInfo && userInfo.code === "customer" && <CustomerLoginheader />
			|| userInfo && (userInfo.code === "md" || userInfo.code === "health_coach" || userInfo.code === "sales_manager" ||
				userInfo.code === "care_manager") && <SalesHeader />
		}
		</>
	)
}

export default LoginCommonLayout