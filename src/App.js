import { Suspense } from "react";
import { Provider } from "react-redux";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import store from "./redux/store";
import Loading from "components/shared-components/Loading";
import routesConfig from "routes";
function App() {
  const routerConfiguration = () => {
    routesConfig.map((routerData, i) => {
      console.log(routerData);
      return (
        <Route
          key={i}
          path={routerData.path}
          element={routerData.element}
          exact={routerData.exact}
        />
      );
    });
  };
  const themes = {
    light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
  };

  return (
    <>
      {console.log(routesConfig)}{" "}
      <Provider store={store}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={{ currentTheme: "light" }}
          insertionPoint="styles-insertion-point"
        >
          <BrowserRouter>
            <Suspense fallback={<Loading cover="page" />}>
              <Routes>
                {routesConfig.map((routerData, i) => {
                  console.log(routerData);
                  return (
                    <Route
                      key={i}
                      path={routerData.path}
                      element={routerData.element}
                      exact={routerData.exact}
                    >
                      {routerData.children &&
                        routerData.children.map((childRoute, childIndex) => (
                          <Route
                            key={childIndex}
                            path={childRoute.path}
                            element={childRoute.element}
                          />
                        ))}
                    </Route>
                  );
                })}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </ThemeSwitcherProvider>{" "}
      </Provider>
    </>
  );
}

export default App;
