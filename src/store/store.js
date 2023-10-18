import axios from "axios";

const API = "https://gateway.scan-interfax.ru";
const { makeAutoObservable } = require("mobx");

class Store {
  constructor() {
    makeAutoObservable(this);
  }

  login = "";
  password = "";
  token = "";
  isAuthError = false;
  isLoading = false;
  isCompaniesLoading = false;
  isSummaryLoading = false;
  isDocumentLoading = false;
  companiesInfo = { used: 0, limit: 0 };
  inn = null;
  tonality = "any";
  limit = 0;
  startDate = new Date();
  endDate = new Date();
  summaryResult;
  summaryDates = [];
  summaryTotal = [];
  summaryRisks = [];
  summaryAll = 0;
  isSummaryError = false;
  IDs = {};
  document = [];
  searchFormChecks = {
    isFullness: false,
    isBusiness: false,
    isMainRole: false,
    isRisksOnly: false,
    isTechNews: false,
    isAnnouncement: false,
    isNews: false,
  };

  setLogin(login) {
    this.login = login;
  }

  setPassword(password) {
    this.password = password;
  }

  setToken(token) {
    this.token = token;
    axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  setAuthError(bool) {
    this.isAuthError = bool;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  setCompaniesLoading(bool) {
    this.isCompaniesLoading = bool;
  }

  setSummaryLoading(bool) {
    this.isSummaryLoading = bool;
  }

  setDocumentLoading(bool) {
    this.isDocumentLoading = bool;
  }

  setCompanyLimits(used, limit) {
    this.companiesInfo.used = used;
    this.companiesInfo.limit = limit;
  }

  setInn(inn) {
    this.inn = inn;
  }

  setTonality(tonality) {
    this.tonality = tonality;
  }

  setLimit(limit) {
    this.limit = limit;
  }

  setStartDate(date) {
    this.startDate = date;
  }

  setEndDate(date) {
    this.endDate = date;
  }

  setSummaryResult(result) {
    this.summaryResult = result;
  }

  setSummaryDates(dates) {
    this.summaryDates = dates;
  }

  setSummaryTotal(total) {
    this.summaryTotal = total;
  }

  setSummaryRisks(risks) {
    this.summaryRisks = risks;
  }

  setSummaryAll(all) {
    this.summaryAll = all;
  }

  setSummaryError(bool) {
    this.isSummaryError = bool;
  }

  setIDs(id) {
    this.IDs = id;
  }

  setDocument(doc) {
    this.document = doc;
  }

  setSearchFormChecks(type) {
    switch (type) {
      case "isFullness":
        this.searchFormChecks.isFullness = !this.searchFormChecks.isFullness;
        break;
      case "isBusiness":
        this.searchFormChecks.isBusiness = !this.searchFormChecks.isBusiness;
        break;
      case "isMainRole":
        this.searchFormChecks.isMainRole = !this.searchFormChecks.isMainRole;
        break;
      case "isRisksOnly":
        this.searchFormChecks.isRisksOnly = !this.searchFormChecks.isRisksOnly;
        break;
      case "isTechNews":
        this.searchFormChecks.isTechNews = !this.searchFormChecks.isTechNews;
        break;
      case "isAnnouncement":
        this.searchFormChecks.isAnnouncement = !this.searchFormChecks.isAnnouncement;
        break;
      case "isNews":
        this.searchFormChecks.isNews = !this.searchFormChecks.isNews;
        break;
      default:
        break;
    }
  }

  resetSearchFormChecks() {
    for (let key in this.searchFormChecks) {
      this.searchFormChecks[key] = false;
    }
  }

  getToken() {
    // Устанавливаем флаг isLoading в true для отображения индикатора загрузки
    this.setLoading(true);
  
    axios
      .post(API + "/api/v1/account/login", {
        login: this.login,
        password: this.password,
      })
      .then((response) => {
        if (response.status === 200) {
          // Сохраняем токен в хранилище
          this.setToken(response.data.accessToken);
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("login", this.login);
  
          // Устанавливаем флаг isLoading в false
          this.setLoading(false);
  
          // Устанавливаем срок действия токена (например, 2 дня)
          const currentDate = new Date();
          const expireDate = new Date(currentDate);
          expireDate.setDate(currentDate.getDate() + 2);
          localStorage.setItem("expire", expireDate);
  
       
        }
      })
      .catch((err) => {
        console.log(err);
  
        // Обработка ошибки при авторизации
        if (err.response) {
          // Если сервер вернул ошибку, то обработайте ее здесь
          if (err.response.status === 401) {
            // Ошибка "Unauthorized" - неправильный логин или пароль
            this.setAuthError(true);
          }
        } else {
          // Обработка других ошибок (например, нет связи с сервером)
          console.error("Произошла ошибка при авторизации:", err.message);
        }
  
        // Устанавливаем флаг isLoading в false
        this.setLoading(false);
  
        // Сбрасываем токен, логин и пароль
        this.setToken("");
        this.setLogin("");
        this.setPassword("");
      });
  }
  

  checkToken() {
    if (
      localStorage.getItem("token") !== "" &&
      localStorage.getItem("expire") > new Date()
    ) {
      this.setToken(localStorage.getItem("token"));
      return;
    } else {
      localStorage.clear();
    }
  }

  getCompaniesInfo() {
    this.setCompaniesLoading(true);
    axios
      .get(API + `/api/v1/account/info`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((response) => {
        this.setCompanyLimits(
          response.data.eventFiltersInfo.usedCompanyCount,
          response.data.eventFiltersInfo.companyLimit
        );
        this.setCompaniesLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getHistograms() {
    this.setSummaryLoading(true);
    axios
      .post(API + `/api/v1/objectsearch/histograms`, {
        issueDateInterval: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                sparkId: null,
                entityId: null,
                inn: this.inn,
                maxFullness: this.searchFormChecks.isFullness,
                inBusinessNews: this.searchFormChecks.isBusiness,
              },
            ],
            onlyMainRole: this.searchFormChecks.isMainRole,
            tonality: this.tonality,
            onlyWithRiskFactors: this.searchFormChecks.isRisksOnly,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeAnnouncements: this.searchFormChecks.isAnnouncement,
          excludeDigests: this.searchFormChecks.isNews,
        },
        similarMode: "duplicates",
        limit: this.limit,
        sortType: "issueDate",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      })
      .then((response) => {
        this.setSummaryResult(response);
        if (
          this.summaryResult.status === 200 &&
          this.summaryResult.data.data !== null &&
          Array.isArray(this.summaryResult.data.data) &&
          this.summaryResult.data.data.length !== 0
          
        ) {
          this.setSummaryLoading(false);
        } else {
          this.setSummaryError(true);
          this.setSummaryLoading(false);
        }
      })
      .catch((err) => {
        this.setSummaryError(true);
        console.log(err);
        this.setSummaryLoading(false);
      });
  }

  getIDs() {
    axios
      .post(API + `/api/v1/objectsearch`, {
        issueDateInterval: {
          startDate: this.startDate,
          endDate: this.endDate,
        },
        searchContext: {
          targetSearchEntitiesContext: {
            targetSearchEntities: [
              {
                type: "company",
                sparkId: null,
                entityId: null,
                inn: this.inn,
                maxFullness: this.searchFormChecks.isFullness,
                inBusinessNews: this.searchFormChecks.isBusiness,
              },
            ],
            onlyMainRole: this.searchFormChecks.isMainRole,
            tonality: this.tonality,
            onlyWithRiskFactors: this.searchFormChecks.isRisksOnly,
            riskFactors: {
              and: [],
              or: [],
              not: [],
            },
            themes: {
              and: [],
              or: [],
              not: [],
            },
          },
          themesFilter: {
            and: [],
            or: [],
            not: [],
          },
        },
        searchArea: {
          includedSources: [],
          excludedSources: [],
          includedSourceGroups: [],
          excludedSourceGroups: [],
        },
        attributeFilters: {
          excludeTechNews: this.searchFormChecks.isTechNews,
          excludeAnnouncements: this.searchFormChecks.isAnnouncement,
          excludeDigests: this.searchFormChecks.isNews,
        },
        similarMode: "duplicates",
        limit: this.limit,
        sortType: "issueDate",
        sortDirectionType: "desc",
        intervalType: "month",
        histogramTypes: ["totalDocuments", "riskFactors"],
      })
      .then((response) => {
        let docID = [];
        response.data.items.map((id) => {
          return docID.push(id.encodedId);
        });
        this.setIDs(docID);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFirstDocuments() {
    axios
      .post(API + `/api/v1/documents`, {
        ids: this.IDs,
      })
      .then((response) => {
        this.setDocument(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getNextDocuments(next) {
    this.setDocumentLoading(true);
    axios
      .post(API + `/api/v1/documents`, {
        ids: next,
      })
      .then((response) => {
        this.setDocument([...this.document, ...response.data]);
        this.setDocumentLoading(false);
      })
      .catch((err) => {
        console.log(err);
        this.setDocumentLoading(false);
      });
  }
}

let store = new Store();
export default store;

