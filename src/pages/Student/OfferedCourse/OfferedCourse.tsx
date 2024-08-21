import { Button, Col, Row } from "antd";
import { useGetAllOfferCourseQuery } from "../../../redux/features/admin/CourseManagement/CourseManagement.api";
import { useEnroledCourseMutation, useGetAllMyOfferCourseQuery } from "../../../redux/features/student/courseManagementApi";
import { toast } from "sonner";

type TCourse ={
    [index:string]:any;
}

const OfferedCourse = () => {
    const {data:myOfferCourses} = useGetAllMyOfferCourseQuery(undefined);
    // console.log("myOfferCourses", myOfferCourses);

    const [enroledCourse] = useEnroledCourseMutation();

    const singleObject = myOfferCourses?.data?.reduce((acc: TCourse, item) => {
      const key = item.course.title;

      acc[key] = acc[key] || { courseTitle: key, sections: [] };

      acc[key].sections.push({
        section: item.section,
        _id: item._id,
        days: item.days,
        startTime: item.startTime,
        endTime: item.endTime,
      });

      return acc;
    }, {});

    const handleEnroll = async (id:string) => {
      const enrollData = {
        offeredCourse: id,
      };

      
      try {
        const res = await enroledCourse(enrollData).unwrap();
        console.log('res',res)
        if(res.success){
            toast.success(`${res.message}`)
        }else{
            toast.error(`${res.message}`);
        }
      } catch (error:any) {
        toast.error(`${error.data.message}`);
      }
      console.log(id);
    };

const modifiedData =  Object.values(singleObject ? singleObject : {});

 if (!modifiedData.length) {
   return <p>No available courses</p>;
 }


    return (
      <Row gutter={[0, 20]}>
        {modifiedData.map((item) => {
          return (
            <Col span={24} style={{ border: "solid #d4d4d4 2px" }}>
              <div style={{ padding: "10px" }}>
                <h2>{item.courseTitle}</h2>
              </div>
              <div>
                {item.sections.map((section:any) => {
                  return (
                    <Row
                      justify="space-between"
                      align="middle"
                      style={{
                        borderTop: "solid #d4d4d4 2px",
                        padding: "10px",
                      }}
                    >
                      <Col span={5}>Section: {section.section} </Col>
                      <Col span={5}>
                        days:{" "}
                        {section.days.map((day:any) => (
                          <span> {day} </span>
                        ))}
                      </Col>
                      <Col span={5}>Start Time: {section.startTime} </Col>
                      <Col span={5}>End Time: {section.endTime} </Col>
                      <Button onClick={() => handleEnroll(section._id)}>
                        Enroll
                      </Button>
                    </Row>
                  );
                })}
              </div>
            </Col>
          );
        })}
      </Row>
    );
};

export default OfferedCourse;