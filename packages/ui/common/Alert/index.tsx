import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// import Router from 'next/router'
import { AxiosResponse } from "axios";

const MySwal = withReactContent(Swal);

const LoadingComponent = () => {
  return (
    <div
      style={{
        width: "5em",
        height: "5em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      Loading . . .
    </div>
  );
};

export const LoadingAlert = () => {
  const handleSelectAlert = () => {
    return MySwal.fire({
      //   customClass: {
      //     popup: `${styles.loadingPopup}`,
      //     icon: `${styles.icon}`,
      //   },
      //   backdrop: `${colors.BLACK}DA`,
      html: <LoadingComponent />,
      allowOutsideClick: false,
      showCloseButton: false,
      showConfirmButton: false,
      showCancelButton: false,
    });
  };
  return handleSelectAlert();
};

const Alert = (props: any) => {
  const handleUnauthorize = () => {
    console.log("-test---------replace router---->");
    // Router.push('/login')
  };

  const handleRedirect = () => {
    // Router.push(props.data.data.payload.redirect_path)
    Swal.close();
  };

  const handleSelectAlert = (response: AxiosResponse) => {
    switch (response?.status) {
      case 200:
        return MySwal.fire({
          customClass: {
            // popup: `${styles.loadingPopup}`,
            // icon: `${styles.icon}`,
          },
          allowOutsideClick: true,
          showCloseButton: false,
          showConfirmButton: false,
          showCancelButton: false,
          // html: <SuccessModalComponent title={response?.data?.res_desc || 'ทำรายการสำเร็จ'} />,
          didOpen: () => {
            setTimeout(() => {
              Swal.close();
            }, 3000);
          },
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              if (props.onConfirmed) {
                props.onConfirmed();
              }
            } catch (err) {}
          }
          if (result.isDismissed) {
            try {
              if (props.onConfirmed) {
                props.onConfirmed();
              }
            } catch (err) {}
          }
        });
      case 401:
        return MySwal.fire({
          icon: "info",
          text: response.data.message,
          // text: 'กรุณาเข้าสู่ระบบ',
          // confirmButtonColor: colors.PRIMARY,
          confirmButtonAriaLabel: "OK",
          // backdrop: `${colors.BLACK}DA`,
          // customClass: {
          //   confirmButton: `${styles.loginButton}`,
          //   popup: `${styles.popup}`,
          //   title: `${styles.title}`,
          //   icon: `${styles.icon}`,
          // },
          didOpen: () => {
            setTimeout(() => {
              Swal.close();
              handleUnauthorize();
            }, 3000);
            MySwal.hideLoading();
          },
        }).then((res) => {
          //
        });
      case 403:
        return MySwal.fire({
          icon: "error",
          text: response.data.message || "FORBIDDEN",
          // confirmButtonColor: colors.DANGER,
          confirmButtonText: "OK",
          // backdrop: `${colors.BLACK}DA`,
          // customClass: {
          //   confirmButton: `${styles.confirmButton}`,
          //   popup: `${styles.popup}`,
          //   title: `${styles.title}`,
          //   icon: `${styles.icon}`,
          // },
          didOpen: () => {
            MySwal.hideLoading();
          },
        }).then((result) => {
          // if (result.isConfirmed) {
          //   handleForbidden()
          // }
          if (result.isConfirmed) {
            try {
              if (props.onConfirmed) {
                props.onConfirmed();
              }
            } catch (err) {}
          } else if (result.dismiss) {
            try {
              if (props.onDismissed) {
                props.onDismissed();
              }
            } catch (err) {}
          }
        });
      case 500:
        return MySwal.fire({
          icon: "error",
          text: `${response?.data?.message}`,
          confirmButtonColor: "#475569",
          confirmButtonText: "OK",
          // backdrop: `${colors.BLACK}DA`,
          // customClass: {
          //   confirmButton: `${styles.confirmButton}`,
          //   popup: `${styles.popup}`,
          //   title: `${styles.title}`,
          //   icon: `${styles.icon}`,
          // },
          didOpen: () => {
            MySwal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              if (props.onConfirmed) {
                props.onConfirmed();
              }
            } catch (err) {}
          } else if (result.dismiss) {
            try {
              if (props.onDismissed) {
                props.onDismissed();
              }
            } catch (err) {}
          }
        });
      case 302:
        if (response.data?.res_code === "0122") {
          return MySwal.fire({
            icon: "error",
            // text: response?.data?.res_desc || resultValidation('0001').message,
            // confirmButtonColor: colors.DANGER,
            confirmButtonText: "OK",
            // backdrop: `${colors.BLACK}DA`,
            // customClass: {
            //   confirmButton: `${styles.confirmButton}`,
            //   popup: `${styles.popup}`,
            //   title: `${styles.title}`,
            //   icon: `${styles.icon}`,
            // },
            didOpen: () => {
              MySwal.hideLoading();
            },
          }).then((result) => {
            try {
              handleRedirect();
            } catch (err) {}
          });
        } else {
          return MySwal.fire({
            icon: "error",
            text: `${response.data.message}`,
            // text: response?.data?.res_desc || resultValidation('0001').message,
            // confirmButtonColor: colors.DANGER,
            confirmButtonText: "OK",
            // backdrop: `${colors.BLACK}DA`,
            // customClass: {
            //   confirmButton: `${styles.confirmButton}`,
            //   popup: `${styles.popup}`,
            //   title: `${styles.title}`,
            //   icon: `${styles.icon}`,
            // },
            didOpen: () => {
              MySwal.hideLoading();
            },
          }).then((result) => {
            if (result.isConfirmed) {
              try {
                if (props.onConfirmed) {
                  props.onConfirmed();
                }
              } catch (err) {}
            } else if (result.dismiss) {
              try {
                if (props.onDismissed) {
                  props.onDismissed();
                }
              } catch (err) {}
            }
          });
        }
      default:
        return MySwal.fire({
          icon: "error",
          text: `${response.data.message}`,
          // text: response?.data?.res_desc || resultValidation('0001').message,
          // confirmButtonColor: colors.DANGER,
          confirmButtonText: "OK",
          // backdrop: `${colors.BLACK}DA`,
          // customClass: {
          //   confirmButton: `${styles.confirmButton}`,
          //   popup: `${styles.popup}`,
          //   title: `${styles.title}`,
          //   icon: `${styles.icon}`,
          // },
          didOpen: () => {
            MySwal.hideLoading();
          },
        }).then((result) => {
          if (result.isConfirmed) {
            try {
              if (props.onConfirmed) {
                props.onConfirmed();
              }
            } catch (err) {}
          } else if (result.dismiss) {
            try {
              if (props.onDismissed) {
                props.onDismissed();
              }
            } catch (err) {}
          }
        });
    }
  };
  return handleSelectAlert(props.data);
};

export default Alert;
