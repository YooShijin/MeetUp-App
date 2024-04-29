const mongoose = require("mongoose");
import MeetupDetail from "@/components/meetups/MeetupDetail";
import { Meetup } from "../api/new-meetup";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      ></MeetupDetail>
    </>
  );
};
export async function getStaticPaths() {
  //in this function we can't use react hooks
  //fetch data for all meetups
  const meetups = await Meetup.find({}, { _id: 1 });

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
  //   return {
  //     paths: [
  //       {
  //         params: {
  //           meetupId: "m1",
  //         },
  //       },
  //       {
  //         params: {
  //           meetupId: "m2",
  //         },
  //       },
  //     ],
  //     fallback: false,
  //   };
}
export async function getStaticProps(context) {
  //in this function we can't use react hooks
  //fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const ObjMeetupID = new mongoose.Types.ObjectId(meetupId);
  const selectedMeetup = await Meetup.findOne({
    _id: ObjMeetupID,
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;
