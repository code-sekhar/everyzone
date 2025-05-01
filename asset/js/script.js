
    document.addEventListener("DOMContentLoaded", function () {
        const settingsBtn = document.getElementById("settings-btn");
        const settingsMenu = document.getElementById("settings-menu");
        const overlay = document.getElementById("overlay");
        const languageToggle = document.getElementById("selected-language");
        const languageMenu = document.getElementById("language-menu");
        const languageText = document.getElementById("language-text");

        const translations = {
            en: {
                settings: "Settings",
                selectLanguage: "Select Language",
                membership: "Membership",
                support: "Support",
                contactUs: "Contact Us",
                logout: "Logout",
                transactions: "Transactions",
                age: "Age",
                type: "Type",
                price: "Price",
                volumeT: "Vol",
                trader: "Trader",
                priceUsd: "Price USD",
                priceSol: "Price SOL",
                liquidity: "Liquidity",
                fdv: "FDV",
                market_cap: "Market Cap",
                txns: "TXNS",
                volume: "VOLUME",
                traders: "TRADERS",
                buys: "BUYS",
                sells: "SELLS",
                buy_vol: "BUY VOL",
                sell_vol: "SELL VOL",
                buyers: "BUYERS",
                sellers: "SELLERS",
                pair_created: "Pair Created",
                pair_address: "Pair Address",
                sol_address: "SOL Address",
                buy_token: "Buy Token",
                sell_token: "Sell Token",
            },
            es: {
                settings: "Configuraci贸n",
                selectLanguage: "Seleccionar Idioma",
                membership: "Membres铆a",
                support: "Soporte",
                contactUs: "Cont谩ctanos",
                logout: "Cerrar Sesi贸n",
                transactions: "Transacciones",
                age: "Tiempo",
                type: "Tipo",
                price: "Precio",
                volumeT: "Vol",
                trader: "Trader",
                priceUsd: "Precio USD",
                priceSol: "Precio SOL",
                liquidity: "Liquidez",
                fdv: "VTD",
                market_cap: "Cap Mercado",
                txns: "TXNS",
                volume: "VOLUMEN",
                traders: "TRADERS",
                buys: "COMPRAS",
                sells: "VENTAS",
                buy_vol: "VOL COMPRA",
                sell_vol: "VOL VENTA",
                buyers: "COMPRADORES",
                sellers: "VENDEDORES",
                pair_created: "Par Creado",
                pair_address: "Par Direcci贸n",
                sol_address: "Direcci贸n SOL",
                buy_token: "Comprar Token",
                sell_token: "Vender Token",
            }
        };

        function changeLanguage(lang) {
            localStorage.setItem("selectedLanguage", lang);

            document.querySelectorAll("[data-i18n]").forEach(element => {
                const key = element.getAttribute("data-i18n");

                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });

            if (typeof PAIR_CREATION_TIMESTAMP !== "undefined") {
                updatePairAge(PAIR_CREATION_TIMESTAMP);
            }

            languageText.innerHTML = lang === "en" ? "馃嚭馃嚫 English" : "馃嚜馃嚫 Espa帽ol";
        }

        const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
        changeLanguage(savedLanguage);

        settingsBtn.addEventListener("click", function (event) {
            event.stopPropagation();
            settingsMenu.classList.toggle("hidden");
            overlay.classList.toggle("hidden");
        });

        document.addEventListener("click", function (event) {
            if (!settingsMenu.contains(event.target) && !settingsBtn.contains(event.target)) {
                settingsMenu.classList.add("hidden");
                overlay.classList.add("hidden");
                languageMenu.classList.add("hidden");
            }
        });

        languageToggle.addEventListener("click", function (event) {
            event.stopPropagation();
            languageMenu.classList.toggle("hidden");
        });

        document.querySelectorAll("#language-menu div").forEach(item => {
            item.addEventListener("click", function () {
                const selectedLang = this.getAttribute("data-lang");
                changeLanguage(selectedLang);
                languageMenu.classList.add("hidden");

                if (typeof PAIR_CREATION_TIMESTAMP !== "undefined") {
                    updatePairAge(PAIR_CREATION_TIMESTAMP);
                }
            });
        });

        document.getElementById("logout").addEventListener("click", function () {
            alert(savedLanguage === "en" ? "Session closed." : "Sesi贸n cerrada.");
        });
    });

    function updatePairAge(pairCreatedAt) {
        const pairCreatedElement = document.getElementById("pair-created");
        if (pairCreatedElement) {
            let dateFormatted = formatDate(pairCreatedAt);
            let ageFormatted = calculatePairAge(pairCreatedAt);

            pairCreatedElement.textContent = `Pair created ${dateFormatted} ${ageFormatted}`;
        }
    }

    function updatePairAgeHeader(pairCreatedAt) {
        const pairCreatedHeaderElement = document.getElementById("pair-created-header");
        if (pairCreatedHeaderElement) {
            let ageFormatted = calculatePairAgeShort(pairCreatedAt);
            pairCreatedHeaderElement.textContent = ageFormatted;
        }
    }

    function calculatePairAge(pairCreatedAt) {
        let createdDate = new Date(pairCreatedAt);
        let now = new Date();
        let diffTime = Math.abs(now - createdDate);

        let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        let ageString = [];

        if (days > 0) ageString.push(`${days}D`);
        if (hours > 0 || days > 0) ageString.push(`${hours}h`);
        if (minutes > 0 || hours > 0 || days > 0) ageString.push(`${minutes}m`);
        ageString.push(`${seconds}s`); 

        return ageString.join(" ");
    }

    function calculatePairAgeShort(pairCreatedAt) {
        let createdDate = new Date(pairCreatedAt);
        let now = new Date();
        let diffTime = Math.abs(now - createdDate);

        let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        let hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

        let ageString = [];

        if (days > 0) ageString.push(`${days}D`);
        if (hours > 0 || days > 0) ageString.push(`${hours}h`);
        if (minutes > 0 || hours > 0 || days > 0) ageString.push(`${minutes}m`);
        ageString.push(`${seconds}s`);

        return ageString.join(" ");
    }

    function formatDate(timestamp) {
        let date = new Date(timestamp);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let hours = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");
        let seconds = date.getSeconds().toString().padStart(2, "0");

        return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (typeof PAIR_CREATION_TIMESTAMP !== "undefined") {
            updatePairAge(PAIR_CREATION_TIMESTAMP);
            updatePairAgeHeader(PAIR_CREATION_TIMESTAMP);

            setInterval(() => {
                updatePairAge(PAIR_CREATION_TIMESTAMP);
                updatePairAgeHeader(PAIR_CREATION_TIMESTAMP);
            }, 1000); 
        }
    });


    async function fetchStats() {
  try {
    const response = await fetch("https://api.dexscreener.com/latest/dex/pairs/solana/8bQTf4BjHjBVRtg7GcoVu9ZpfdJrYfvjbt8it4qMqa8N");
    const data = await response.json();

    const pair = (data.pairs && data.pairs.length > 0) ? data.pairs[0] : data.pair;
    if (!pair) {
      throw new Error("No se encontraron datos del par en la respuesta de la API.");
    }

    cachedData = {
      currentUsdPrice: parseFloat(pair.priceUsd),
      currentNativePrice: parseFloat(pair.priceNative),

      pricePercentChange: {
        "5min": pair.priceChange?.m5 ?? 0,
        "1h": pair.priceChange?.h1 ?? 0,
        "6h": pair.priceChange?.h6 ?? 0,
        "24h": pair.priceChange?.h24 ?? 0,
      },

      buys: {
        "5min": pair.txns?.m5?.buys ?? 0,
        "1h": pair.txns?.h1?.buys ?? 0,
        "6h": pair.txns?.h6?.buys ?? 0,
        "24h": pair.txns?.h24?.buys ?? 0,
      },
      sells: {
        "5min": pair.txns?.m5?.sells ?? 0,
        "1h": pair.txns?.h1?.sells ?? 0,
        "6h": pair.txns?.h6?.sells ?? 0,
        "24h": pair.txns?.h24?.sells ?? 0,
      },

      // Manteniendo las mismas referencias para buyers/sellers, se asume que son id茅nticos a buys/sells
      buyers: {
        "5min": pair.txns?.m5?.buys ?? 0,
        "1h": pair.txns?.h1?.buys ?? 0,
        "6h": pair.txns?.h6?.buys ?? 0,
        "24h": pair.txns?.h24?.buys ?? 0,
      },
      sellers: {
        "5min": pair.txns?.m5?.sells ?? 0,
        "1h": pair.txns?.h1?.sells ?? 0,
        "6h": pair.txns?.h6?.sells ?? 0,
        "24h": pair.txns?.h24?.sells ?? 0,
      },

      totalVolume: {
        "5min": pair.volume?.m5 ?? 0,
        "1h": pair.volume?.h1 ?? 0,
        "6h": pair.volume?.h6 ?? 0,
        "24h": pair.volume?.h24 ?? 0,
      },

      buyVolume: {
        "5min": 0,
        "1h": 0,
        "6h": 0,
        "24h": 0,
      },
      sellVolume: {
        "5min": 0,
        "1h": 0,
        "6h": 0,
        "24h": 0,
      }
    };

    if (cachedData.pricePercentChange["24h"] !== undefined) {
      updateChangePercentage(parseFloat(cachedData.pricePercentChange["24h"]).toFixed(2));
    }

    updateStatsUI();

  } catch (error) {
    console.error("鉂?Error fetching stats:", error);
  }
}
    document.addEventListener("DOMContentLoaded", function () {
        fetchStats();
        setInterval(fetchStats, 5000);
    });

    let currentTimeFrame = "h24";
    let cachedData = null; 

    function updateStatsUI() {
        if (!cachedData) return; 

        let timeFrameKey = convertTimeFrame(currentTimeFrame); 

        document.getElementById("price-usd").innerText = `${parseFloat(cachedData.currentUsdPrice).toFixed(8)}`;
        document.getElementById("price-sol").innerText = `${parseFloat(cachedData.currentNativePrice).toFixed(10)}`;

        updateTabPercentage("change-m5", cachedData.pricePercentChange["5min"]);
        updateTabPercentage("change-h1", cachedData.pricePercentChange["1h"]);
        updateTabPercentage("change-h6", cachedData.pricePercentChange["6h"]);
        updateTabPercentage("change-h24", cachedData.pricePercentChange["24h"]);

        document.getElementById("txns").innerText = (cachedData.buys[timeFrameKey] + cachedData.sells[timeFrameKey]).toLocaleString();
        document.getElementById("volume").innerText = formatNumber(cachedData.totalVolume[timeFrameKey]);

        let buys = cachedData.buys[timeFrameKey];
        let sells = cachedData.sells[timeFrameKey];
        let totalTxns = buys + sells;

        document.getElementById("buyers").innerText = buys.toLocaleString();
        document.getElementById("sellers").innerText = sells.toLocaleString();

        let buyPercent = (buys / totalTxns) * 100;
        let sellPercent = (sells / totalTxns) * 100;

        document.getElementById("buyers-bar").style.width = `${buyPercent}%`;
        document.getElementById("sellers-bar").style.width = `${sellPercent}%`;

        let buyVol = cachedData.buyVolume[timeFrameKey];
        let sellVol = cachedData.sellVolume[timeFrameKey];
        let totalVolume = buyVol + sellVol;

        document.getElementById("buyersVolume").innerText = formatNumber(buyVol);
        document.getElementById("sellersVolume").innerText = formatNumber(sellVol);

        let buyVolPercent = (buyVol / totalVolume) * 100;
        let sellVolPercent = (sellVol / totalVolume) * 100;

        document.getElementById("buyers-volume-bar").style.width = `${buyVolPercent}%`;
        document.getElementById("sellers-volume-bar").style.width = `${sellVolPercent}%`;

        let buyersCount = cachedData.buyers[timeFrameKey];
        let sellersCount = cachedData.sellers[timeFrameKey];

        document.getElementById("buyersCount").innerText = buyersCount.toLocaleString();
        document.getElementById("sellersCount").innerText = sellersCount.toLocaleString();

    }

    function updateChangePercentage(priceChange) {
        const changeValue = document.getElementById("change-value");
        const changeIcon = document.getElementById("change-icon");

        changeValue.innerText = `${priceChange}%`;

        if (priceChange > 0) {
            changeValue.classList.add("text-green-400");
            changeValue.classList.remove("text-red-400");

            changeIcon.classList.remove("hidden");
            changeIcon.classList.add("text-green-400");
            changeIcon.innerHTML = `<path d="M12 4l-8 8h16l-8-8z"></path>`; 
        } else {
            changeValue.classList.add("text-red-400");
            changeValue.classList.remove("text-green-400");

            changeIcon.classList.remove("hidden");
            changeIcon.classList.add("text-red-400");
            changeIcon.innerHTML = `<path d="M12 20l8-8H4l8 8z"></path>`; 
        }
    }

    function updateTabPercentage(elementId, value) {
    let element = document.getElementById(elementId);
    value = typeof value === "number" ? value : 0;

    element.innerText = `${value.toFixed(2)}%`;

    if (value > 0) {
        element.classList.add("text-green-400");
        element.classList.remove("text-red-400");
    } else {
        element.classList.add("text-red-400");
        element.classList.remove("text-green-400");
    }
}

    function convertTimeFrame(timeFrame) {
        const timeFrameMap = {
            "m5": "5min",
            "h1": "1h",
            "h6": "6h",
            "h24": "24h"
        };
        return timeFrameMap[timeFrame] || "24h"; 
    }

    function formatNumber(value) {
        if (value >= 1000000) {
            return `$${(value / 1000000).toFixed(1)}M`; 
        }
        if (value >= 1000) {
            return `$${(value / 1000).toFixed(1)}K`; 
        }
        return `$${parseFloat(value).toFixed(2)}`;
    }

    document.addEventListener("DOMContentLoaded", function () {
        const tabButtons = document.querySelectorAll(".tab-btn");

        function updateActiveTab() {
            tabButtons.forEach(btn => {
                btn.classList.remove("bg-[#294dd0]");
                btn.classList.add("bg-[#1C2A3D]"); 
            });

            const activeButton = document.querySelector(`.tab-btn[data-time="${currentTimeFrame}"]`);
            if (activeButton) {
                activeButton.classList.add("bg-[#294dd0]"); 
                activeButton.classList.remove("bg-[#1C2A3D]");
            }
        }

        tabButtons.forEach(button => {
            button.addEventListener("click", function () {
                currentTimeFrame = this.dataset.time; 
                updateActiveTab();
                if (cachedData) {
                    updateStatsUI(); 
                }
            });
        });

        updateActiveTab(); 
    });

    let isInitialLoad = true;
let lastLogoUrl   = "";

async function fetchDexScreenerData() {
  try {
    const res  = await fetch("https://api.dexscreener.com/latest/dex/pairs/solana/8bQTf4BjHjBVRtg7GcoVu9ZpfdJrYfvjbt8it4qMqa8N");
    const data = await res.json();
    const pair = (data.pairs && data.pairs.length > 0) ? data.pairs[0] : data.pair;
    if (!pair) throw new Error("Par no encontrado en Dexscreener.");

    document.getElementById("liquidity").innerText        = formatNumber(pair.liquidity.usd);
    document.getElementById("fdv").innerText              = formatNumber(pair.fdv);
    document.getElementById("market-cap").innerText       = formatNumber(pair.marketCap);
    document.getElementById("pair-created").innerText     = `${formatDate(pair.pairCreatedAt)} (${calculatePairAge(pair.pairCreatedAt)})`;
    document.getElementById("pair-created-header").innerText = calculatePairAgeShort(pair.pairCreatedAt);

    const logoEl        = document.getElementById("token-logo");
    const placeholderEl = document.getElementById("logo-placeholder");
    if (!lastLogoUrl) {
      logoEl.classList.add("hidden");
      placeholderEl.classList.remove("hidden");
    }

    const dsLogoUrl = pair.info?.imageUrl || pair.info?.openGraph || pair.info?.header || "";
    if (logoEl) {
      if (dsLogoUrl && dsLogoUrl !== lastLogoUrl) {
        lastLogoUrl = dsLogoUrl;
        logoEl.src  = dsLogoUrl;
        logoEl.classList.remove("hidden");
        placeholderEl.classList.add("hidden");
      }
      else if (!dsLogoUrl && !lastLogoUrl) {
        await fetchRugCheckData();
      }
    }

    if (isInitialLoad) {
      isInitialLoad = false;

      document.getElementById("token-name").innerText         = pair.baseToken.symbol;
      document.getElementById("token-name-address").innerText = pair.baseToken.symbol;

      const dexHtml =
        `<img src="https://dd.dexscreener.com/ds-data/chains/${pair.chainId}.png" class="w-4 h-4 mr-1"> ` +
        `${pair.chainId.toUpperCase()}` +
        ` <img src="https://dd.dexscreener.com/ds-data/dexes/${pair.dexId}.png" class="w-4 h-4 ml-2"> ` +
        `${pair.dexId.toUpperCase()}`;
      document.getElementById("dex-info").innerHTML = dexHtml;

      const setLink = (id, addr) => {
        const el = document.getElementById(id);
        if (el) {
          el.innerText = truncateAddress(addr);
          el.href      = `https://solscan.io/account/${addr}`;
        }
      };
      setLink("pair-address", pair.pairAddress);
      document.getElementById("pair-address-link").href      = `https://solscan.io/account/${pair.pairAddress}`;
      setLink("token-address", pair.baseToken.address);
      document.getElementById("token-address-link").href     = `https://solscan.io/account/${pair.baseToken.address}`;
      setLink("sol-address", pair.quoteToken.address);
      document.getElementById("sol-address-link").href       = `https://solscan.io/account/${pair.quoteToken.address}`;

      const websiteBtn = document.getElementById("token-website");
      if (pair.info.websites?.[0]?.url) {
        websiteBtn.href          = pair.info.websites[0].url;
        websiteBtn.style.display = "flex";
      } else {
        websiteBtn.style.display = "none";
      }

      const socialBtn  = document.getElementById("token-social");
      const socialIcon = socialBtn.querySelector("i");
      const socialText = document.getElementById("token-social-text");
      if (pair.info.socials?.[0]?.url) {
        const s = pair.info.socials[0];
        socialBtn.href          = s.url;
        socialBtn.style.display = "flex";
        if (s.type === "twitter") {
          socialIcon.setAttribute("data-lucide", "twitter");
          socialText.textContent = "Twitter";
        } else if (s.type === "telegram") {
          socialIcon.setAttribute("data-lucide", "bot");
          socialText.textContent = "Telegram";
        } else {
          socialIcon.setAttribute("data-lucide", "globe");
          socialText.textContent = "Social";
        }
      } else {
        socialBtn.style.display = "none";
      }
    }

  } catch (err) {
    console.error("鉂?Error en fetchDexScreenerData:", err);
  }
}

fetchDexScreenerData();
setInterval(fetchDexScreenerData, 5000);

    function formatNumber(value) {
        if (value >= 1000000000) { 
            return `$${(value / 1000000000).toFixed(2)}B`;
        }
        if (value >= 1000000) { 
            return `$${(value / 1000000).toFixed(1)}M`; 
        }
        if (value >= 1000) { 
            return `$${(value / 1000).toFixed(1)}K`;
        }
        return `$${parseFloat(value).toFixed(2)}`; 
    }

    function truncateAddress(address) {
        return address ? `${address.substring(0, 14)}...${address.substring(address.length - 14)}` : "--";
    }

    function truncateAddress(address) {
        return address.substring(0, 10) + "..." + address.substring(address.length - 10);
    }

    function updateTransactionsTable(transactions) {
        const tbodyDesktop = document.getElementById("transactions-body");
        const tbodyMobile = document.getElementById("transactions-body-mobile");

        tbodyDesktop.innerHTML = "";
        tbodyMobile.innerHTML = "";

        const isMobile = window.innerWidth < 1024; 
        const typeMapping = getTypeMapping(isMobile);

        transactions.slice(0, 60).forEach((tx) => {
            const row = document.createElement("tr");
            row.classList.add("border-b", "border-gray-600");

            const age = getTimeAgo(tx.blockTimestamp);

            let typeColor = "text-gray-400";
            let shortType = typeMapping[tx.subCategory] || tx.subCategory;

            if (["newPosition", "Buy", "accumulation"].includes(tx.subCategory)) {
                typeColor = "text-green-400";
            } else if (["sellAll", "partialSell"].includes(tx.subCategory)) {
                typeColor = "text-red-400";
            }

            const truncatedHash = isMobile
                ? `${tx.transactionHash.substring(0, 4)}...${tx.transactionHash.slice(-4)}`
                : `${tx.transactionHash.substring(0, 20)}...${tx.transactionHash.slice(-10)}`;

            row.innerHTML = `
            <td class="py-2 ${age.color}">${age.time}</td>
            <td class="py-2 font-bold ${typeColor}">${shortType}</td>
            <td class="py-2 text-white">$${Number(tx.baseTokenPriceUsd).toFixed(4)}</td>
            <td class="py-2 ${typeColor}">$${Number(tx.totalValueUsd).toFixed(2)}</td>
            <td class="py-2 ${typeColor}">${Number(tx.baseTokenAmount).toFixed(2)}</td>
            <td class="py-2 text-blue-400 flex items-center">
                <a href="https://solscan.io/tx/${tx.transactionHash}" target="_blank" class="hover:underline flex items-center">
                    ${truncatedHash}
                    <i data-lucide="external-link" class="w-4 h-4 ml-1"></i>
                </a>
            </td>
        `;

            if (isMobile) {
                tbodyMobile.appendChild(row);
            } else {
                tbodyDesktop.appendChild(row);
            }
        });
    }

    function getTimeAgo(timestamp) {
        const txTime = new Date(timestamp).getTime();
        const now = Date.now();
        const diff = Math.floor((now - txTime) / 1000); 

        if (diff < 60) {
            return { time: `${diff}s`, color: "text-white" }; 
        } else {
            const minutes = Math.floor(diff / 60);
            return { time: `${minutes}m`, color: "text-white" }; 
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        const links = document.querySelectorAll(".nav-link");

        links.forEach(link => {
            link.addEventListener("click", function () {
                links.forEach(l => l.classList.remove("active")); 
                this.classList.add("active"); 
            });
        });
    });

    async function fetchRugCheckData() {
  try {
    const apiUrl  = "https://api.rugcheck.xyz/v1/tokens/GptJXCaKXxuaPTpLRBZ6v9h3dkirgYv8thvzW7Utpump/report";
    const response = await fetch(apiUrl);
    const data     = await response.json();
    if (!data || !data.markets || data.markets.length === 0) return;

    const logoEl        = document.getElementById("token-logo");
    const placeholderEl = document.getElementById("logo-placeholder");

    if (!lastLogoUrl) {
      logoEl.classList.add("hidden");
      placeholderEl.classList.remove("hidden");

      const rcImg = data.fileMeta?.image || data.image;
      if (rcImg) {
        lastLogoUrl = rcImg;
        logoEl.src  = rcImg;
        logoEl.classList.remove("hidden");
        placeholderEl.classList.add("hidden");
      }
    }

    let highestLpLocked      = 0;
    let highestLpTotalSupply = 0;
    for (const m of data.markets) {
      const lp = m.lp;
      if (lp?.lpLocked && lp?.lpTotalSupply && lp.lpLocked > highestLpLocked) {
        highestLpLocked      = lp.lpLocked;
        highestLpTotalSupply = lp.lpTotalSupply;
      }
    }

    let liquidityPercent = "N/A";
    let liquidityColor   = "bg-gray-500";
    let showLockIcon     = false;
    if (highestLpLocked && highestLpTotalSupply) {
      const pct = (highestLpLocked / highestLpTotalSupply) * 100;
      liquidityPercent = pct.toFixed(2);
      if (pct >= 95) {
        liquidityColor = "bg-green-500";
        showLockIcon   = true;
      } else {
        liquidityColor = "bg-orange-500";
      }
    }

    const score     = data.score_normalised ?? 0;
    let riskLevel   = "GOOD";
    let riskColor   = "bg-green-500";
    if (score > 20 && score <= 40) {
      riskLevel = "WARNING";
      riskColor = "bg-orange-500";
    } else if (score > 40) {
      riskLevel = "DANGER";
      riskColor = "bg-red-500";
    }

    const riskDescriptions = (data.risks ?? [])
      .filter(r => r.description)
      .map(r => ({
        description: r.description,
        color: r.level === "danger" ? "bg-red-600"
             : r.level === "warn"   ? "bg-orange-600"
             : "bg-green-600"
      }));

    const ri = document.getElementById("risk-indicator");
    if (ri) {
      ri.textContent = riskLevel;
      ri.className   = `text-white text-sm font-semibold px-2 py-1 rounded-md ${riskColor}`;
    }

    const lpEl = document.getElementById("liquidity-percentage");
    if (lpEl) {
      lpEl.textContent = `LOCKED: ${liquidityPercent}%`;
      lpEl.className   = `text-white text-sm font-semibold px-2 py-1 rounded-md ${liquidityColor}`;
    }

    const lockIcon = document.getElementById("lock-icon");
    if (lockIcon) {
      showLockIcon ? lockIcon.classList.remove("hidden")
                   : lockIcon.classList.add("hidden");
    }

    const tipPct = document.getElementById("tooltip-percentage");
    const pBar   = document.getElementById("progress-bar");
    if (tipPct && pBar) {
      tipPct.textContent = `${liquidityPercent}%`;
      pBar.style.width   = `${liquidityPercent}%`;
    }

    const rt   = document.getElementById("risk-tooltip");
    const rlt  = document.getElementById("risk-level-text");
    const rlst = document.getElementById("risk-list");
    if (rt && rlt && rlst) {
      rlt.textContent = `Risk Level: ${riskLevel}`;
      rlst.innerHTML  = "";
      if (riskDescriptions.length) {
        riskDescriptions.slice(0,3).forEach(r => {
          const div = document.createElement("div");
          div.textContent = r.description;
          div.className   = `text-white text-xs p-2 rounded-md mt-1 ${r.color}`;
          rlst.appendChild(div);
        });
      } else {
        rlst.innerHTML = `<div class="text-gray-400 text-xs p-2 rounded-md">
          No additional risk details
        </div>`;
      }
    }

    const lpTool = document.getElementById("liquidity-tooltip");
    if (lockIcon && lpTool && lpEl) {
      lockIcon.onmouseenter = () => lpTool.classList.remove("hidden");
      lockIcon.onmouseleave = () => lpTool.classList.add("hidden");
      lpEl.onmouseenter     = () => lpTool.classList.remove("hidden");
      lpEl.onmouseleave     = () => lpTool.classList.add("hidden");
    }
    if (ri && rt) {
      ri.onmouseenter = () => rt.classList.remove("hidden");
      ri.onmouseleave = () => rt.classList.add("hidden");
    }

  } catch (error) {
    console.error("鉂?Error cargando datos desde RugCheck:", error);
  }
}

fetchRugCheckData();
setInterval(fetchRugCheckData, 600000);

window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  if (preloader) preloader.remove();
});

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

