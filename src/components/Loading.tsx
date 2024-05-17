import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { motion } from "framer-motion"
const Loading = () => {
  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 0.9 }}
    transition={{ duration: 0.6 }}
    className='bg-secondaryLight dark:bg-secondaryDark shadow-2xl w-[300px] h-[90px] sm:w-[480px]  sm:h-[108px] flex flex-col rounded-lg  items-center'>
    <aside className='mt-[32px]'>
        <p className='text-[13px] dark:text-secondaryLight'><span className='font-semibold'>Uploading</span>, please wait..</p>
    </aside>
     <aside className=' w-[140px] sm:w-[320px] mt-[16px]'>
     <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
     </aside>
    </motion.div>
  )
}

export default Loading
