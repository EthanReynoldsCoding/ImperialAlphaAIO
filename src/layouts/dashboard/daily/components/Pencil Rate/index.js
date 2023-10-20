import { useCallback, useEffect, useState } from "react";
import { Card } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { FaEllipsisH } from 'react-icons/fa';
import { supabase } from "supabaseClient";

import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';


function ReferralTracking() {
	const [Lot_Leads, setLot_Leads] = useState(0);
	const [Inbound_Leads, setInbound_Leads] = useState(0);
	const [Outbound_Leads, setOutbound_Leads] = useState(0);
	const [Global_Leads, setGlobal_Leads] = useState(0);
	const [Service_Leads, setService_Leads] = useState(0);
	const [Facebook_Leads, setFacebook_Leads] = useState(0);
	const [Friends_Leads, setFriends_Leads] = useState(0);
	const [Referral_Leads, setReferral_Leads] = useState(0);
	const [Repeat_Leads, setRepeat_Leads] = useState(0);
	const [Other_Leads, setOther_Leads] = useState(0);


	const getLot_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("lot_leads");
	
		if (!sumError && sum) {
		  setLot_Leads(sum);
		}
	}, []);

	const getInbound_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("inbound_leads");
	
		if (!sumError && sum) {
		  setInbound_Leads(sum);
		}
	}, []);

	const getOutbound_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("outbound_leads");
	
		if (!sumError && sum) {
		  setOutbound_Leads(sum);
		}
	}, []);

	const getGlobal_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("global_leads");

		if (!sumError && sum) {
		  setGlobal_Leads(sum);
		}
	}, []);

	const getService_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("service_leads");

		if (!sumError && sum) {
		  setService_Leads(sum);
		}
	}, []);

	const getFacebook_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("facebook_leads");

		if (!sumError && sum) {
		  setFacebook_Leads(sum);
		}
	})

	const getFriends_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("friends_leads");

		if (!sumError && sum) {
		  setFriends_Leads(sum);
		}
	})
		 
	const getReferral_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("referral_leads");

		if (!sumError && sum) {
		  setReferral_Leads(sum);
		}
	})

	const getRepeat_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("repeat_leads");

		if (!sumError && sum) {
		  setRepeat_Leads(sum);
		}
	})

	const getOther_Leads = useCallback(async () => {
		const { data: sum, sumError } = await supabase.rpc("other_leads");

		if (!sumError && sum) {
		  setOther_Leads(sum);
		}
	})


		
	useEffect(() => {
		getLot_Leads();
		getInbound_Leads();
		getOutbound_Leads();
		getGlobal_Leads();
		getService_Leads();
		getFacebook_Leads();
		getFriends_Leads();
		getReferral_Leads();
		getRepeat_Leads();
		getOther_Leads();
	}, [getLot_Leads,getInbound_Leads, getOutbound_Leads, getGlobal_Leads, getService_Leads, getFacebook_Leads, getFriends_Leads, getReferral_Leads, getRepeat_Leads, getOther_Leads]);

  // Define the data after fetching results
  const data = [
    { name: 'Lot', value: Lot_Leads }, // Remove the curly braces
    { name: 'Inbound Call', value: Inbound_Leads },
    { name: 'Outbound Call', value: Outbound_Leads },
    { name: 'Global Lead', value: Global_Leads },
    { name: 'Service', value: Service_Leads },
    { name: 'Facebook', value: Facebook_Leads },
    { name: 'Friends & Family', value: Friends_Leads },
    { name: 'Referral', value: Referral_Leads },
    { name: 'Repeat Customer', value: Repeat_Leads },
    { name: 'Other', value: Other_Leads },
  ];

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF5733', '#5B65E0', '#FFA057', '#67C0DD', '#FFD700', '#47D572'];

  return (
    <Card sx={{ height: '340px' }}>
      <VuiBox sx={{ width: '100%' }}>
        <VuiBox display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%', marginBottom: '10px' }}>
          <VuiTypography variant='lg' color='white' mr='auto' fontWeight='bold'>
            Lead Origin Comparison
          </VuiTypography>
          <VuiBox display='flex' justifyContent='center' alignItems='center' sx={{ width: '37px', height: '37px', cursor: 'pointer', borderRadius: '12px' }}>
            <FaEllipsisH color='#FFFFFF' size='18px' />
          </VuiBox>
        </VuiBox>
        <VuiBox
          display='flex'
          sx={({ breakpoints }) => ({
            [breakpoints.up('xs')]: {
              flexDirection: 'column',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            },
            [breakpoints.up('md')]: {
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            },
          })}
        >
          <VuiBox sx={{ position: 'relative', display: 'inline-flex', flexDirection: 'row' }}>
            <PieChart width={500} height={500}>
              <Pie dataKey='value' data={data} cx={150} cy={100} outerRadius={80} fill='#8884d8'>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip dataKey="value" />
              <Legend align="left" verticalAlign="middle" layout="vertical" wrapperStyle={{ left: 0, top: 0, fontSize: '14px' }} />
            </PieChart>
          </VuiBox>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default ReferralTracking;
