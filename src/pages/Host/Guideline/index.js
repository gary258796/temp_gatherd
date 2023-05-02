import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer";

const Guideline = () => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        padding: "36px",
        boxSizing: "border-box",
        backgroundColor: "#f8f6eb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h1>{t("hostGuideline.title")}</h1>
        <h3>{t("hostGuideline.subtitle")}</h3>
        <ul>
          <li>
            {t("hostGuideline.1.title")}
            <ul>
              <li>{t("hostGuideline.1.1")}</li>
              <li>{t("hostGuideline.1.2")}</li>
            </ul>
          </li>
          <li>
            {t("hostGuideline.2.title")}
            <ul>
              <li>{t("hostGuideline.2.1")}</li>
            </ul>
          </li>
          <li>
            {t("hostGuideline.3.title")}
            <ul>
              <li>{t("hostGuideline.3.1")}</li>
              <li>{t("hostGuideline.3.2")}</li>
            </ul>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Guideline;
