export type pageNames = "home" | "about" | "privacy";

interface IPageData {
  name: string;
  profession: string[];
  navigation: INavigationEntry[];
  home: IPageDataInner;
  about: IPageDataInner;
  privacy: IPageDataInner;
}

interface INavigationEntry {
  name: pageNames;
  url: string;
  navigationTitle: string;
  displayInNavigation: boolean,
}

interface IPageDataInner {
  name: pageNames;
  url: string;
  pageTitle: string;
  pageDescription: string;
}

const PageData: IPageData = {
  name: "Thomas Bieniek",
  profession: ["Software Engineer", "Photography", "Drummer"],
  navigation: [
    {
      name: "home",
      url: "/",
      navigationTitle: "Home",
      displayInNavigation: false,
    },
    {
      name: "about",
      url: "/about",
      navigationTitle: "About",
      displayInNavigation: true,
    },
    {
      name: "privacy",
      url: "/privacy",
      navigationTitle: "Privacy",
      displayInNavigation: true,
    }
  ],
  home: {
    name: "home",
    url: "/",
    pageTitle: "Home",
    pageDescription: "Something edgy maybe",
  },
  about: {
    name: "about",
    url: "/about",
    pageTitle: "About",
    pageDescription: "Heres something about me",
  },
  privacy: {
    name: "privacy",
    url: "/privacy",
    pageTitle: "Privacy",
    pageDescription: "impressum and stuff",
  }
}

export default PageData;