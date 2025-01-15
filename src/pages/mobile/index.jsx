// Imports:
import MetaData from "../../components/generics/meta-data";
import Wrapper from "../../layouts/wrapper";
import MobileForm from "../../components/specific/mobile-form";
import MobileHeader from "../../components/specific/mobile-header";
import { MobileFormProvider } from "../../contexts/mobile-form-context";

export default function Mobile() {
  return (
    <>
      <MetaData title="Mobile" />
      <Wrapper
        className={"block md:hidden lg:hidden xl:hidden overflow-y-auto"}
      >
        <div className="container py-10 px-5 space-y-5">
          <MobileHeader />
          <div className="divider"></div>
          <MobileFormProvider>
            <MobileForm />
          </MobileFormProvider>
        </div>
      </Wrapper>
    </>
  );
}
