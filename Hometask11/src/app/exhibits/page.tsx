"use client"
import React from "react";
import { fetchExhibits } from "@/api/exhibitActions";
import StipePage from "@/components/StipePage";
// import { Provider } from "react-redux";
// import store, {wrapper} from "@/store/store";
import StoreProvider from "@/components/StoreProvider";

const Strip: React.FC<{ searchParams: { page: string } }> = async ({ searchParams }) => {
  const page = parseInt(searchParams.page || '1');

  try {
    const data = await fetchExhibits(page);
    console.log(data);
    return (
      <StoreProvider>
        <StipePage exhibits={data.data} totalPages={data.lastPage} page={page} />
      </StoreProvider>
    )
  } catch (error) {
    console.error(error);
    return <div>Error: Failed to fetch data</div>;
  }
}

export default Strip;
// export default wrapper.withRedux(Strip);


// "use client"
// import React from "react";
// import { fetchExhibits } from "@/api/exhibitActions";
// import StipePage from "@/components/StipePage";

// const Strip: React.FC<{ searchParams: { page: string } }> = async ({ searchParams }) => {
//   const page = parseInt(searchParams.page || '1');

//   try {
//     const data = await fetchExhibits(page);
//     console.log(data);
//     return (
//         <StipePage exhibits={data.data} totalPages={data.lastPage} page={page} />
//     )
//   } catch (error) {
//     console.error(error);
//     return <div>Error: Failed to fetch data</div>;
//   }
// }

// export default Strip;








// import React from "react";
// import { fetchExhibits } from "@/api/exhibitActions";
// import StipePage from "@/components/StipePage";
// import { wrapper } from "@/store/store"; 

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     const page = parseInt(context.query.page as string || '1'); 

//     const state = store.getState();
//     const isAuthenticated = state.user?.isAuthenticated || false;

//     try {
//       const data = await fetchExhibits(page);

//       return {
//         props: {
//           exhibits: data.data,
//           totalPages: data.lastPage,
//           page,
//           isAuthenticated, 
//         },
//       };
//     } catch (error) {
//       console.error(error);
//       return {
//         props: {
//           exhibits: [],
//           totalPages: 0,
//           page,
//           isAuthenticated,
//         },
//       };
//     }
//   }
// );

// const Strip: React.FC<{
//   exhibits: any;
//   totalPages: number;
//   page: number;
//   isAuthenticated: boolean;
// }> = ({ exhibits, totalPages, page, isAuthenticated }) => {
//   console.log("User Authenticated:", isAuthenticated);

//   return (
//     <StipePage exhibits={exhibits} totalPages={totalPages} page={page} />
//   );
// };

// export default Strip;


