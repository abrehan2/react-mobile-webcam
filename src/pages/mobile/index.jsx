// Imports:
import MetaData from "../../components/generics/meta-data";
import Wrapper from "../../layouts/wrapper";

export default function Mobile() {
  return (
    <>
      <MetaData title="Mobile" />
      <Wrapper
        className={"block md:hidden lg:hidden xl:hidden overflow-y-auto"}
      >
        <p className="text-black">This is a mobile layout for a webcam.</p>
      </Wrapper>
    </>
  );
}
