import MeetupList from "@/components/meetups/MeetupList";
import { Meetup } from "./api/new-meetup";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meetup",
//     image:
//       "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     address: "Some address, 1234 Some city ",
//     description: "this is first meetup",
//   },
//   {
//     id: "m2",
//     title: "The Second Meetup",
//     image:
//       "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=869&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     address: "Some address, 1234 Some city ",
//     description: "this is second meetup",
//   },
// ];
const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly acive React meetups"
        />
      </Head>
      <MeetupList meetups={props.meetups}></MeetupList>
    </>
  );
};
export async function getStaticProps() {
  //fetch data from API
  const meetups = await Meetup.find();
  console.log(meetups);

  return {
    props: {
      meetups: meetups.map((ele) => {
        return {
          id: ele._id.toString(),
          title: ele.title,
          image: ele.image,
          address: ele.address,
        };
      }),
    },
    revalidate: 10,
  };
}

// export async function getStaticSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   //fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export default HomePage;
