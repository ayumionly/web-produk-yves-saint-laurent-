document.addEventListener("DOMContentLoaded", function () {

    // ============================
    // SEARCH PRODUK
    // ============================

    const searchInput = document.getElementById("searchInput");
    const searchButton = document.querySelector(".search-box button");
    const products = document.querySelectorAll(".product-card");

    function searchProduct() {
        const keyword = searchInput.value.toLowerCase().trim();
        let jumlahDitemukan = 0;

        products.forEach(function (product) {

            const namaProduk = product
                .querySelector("h3")
                .textContent
                .toLowerCase();

            if (namaProduk.includes(keyword)) {
                product.style.display = "";
                jumlahDitemukan++;
            } else {
                product.style.display = "none";
            }
        });

        // Pesan jika tidak ada produk
        let pesan = document.getElementById("notFound");

        if (jumlahDitemukan === 0 && keyword !== "") {

            if (!pesan) {
                pesan = document.createElement("p");
                pesan.id = "notFound";

                pesan.textContent =
                    "😢 Produk yang kamu cari tidak ditemukan.";

                pesan.style.textAlign = "center";
                pesan.style.fontSize = "18px";
                pesan.style.margin = "30px";
                pesan.style.color = "#777";

                document.querySelector(".product").after(pesan);
            }

        } else {

            if (pesan) {
                pesan.remove();
            }
        }
    }

    // Klik tombol search
    searchButton.addEventListener("click", searchProduct);

    // Search ketika mengetik
    searchInput.addEventListener("input", searchProduct);


    // ============================
    // KERANJANG
    // ============================

    let jumlahKeranjang = 0;

    const tombolTambah = document.querySelectorAll(
        ".product-card button"
    );

    const tombolKeranjang = document.querySelectorAll(
        "body > div > button"
    );

    // Membuat tulisan jumlah keranjang
    const cartCount = document.createElement("span");

    cartCount.textContent = "0";
    cartCount.id = "cartCount";

    cartCount.style.position = "fixed";
    cartCount.style.right = "20px";
    cartCount.style.bottom = "20px";
    cartCount.style.zIndex = "9999";

    cartCount.style.background = "#d4af37";
    cartCount.style.color = "white";

    cartCount.style.padding = "12px 18px";
    cartCount.style.borderRadius = "30px";

    cartCount.style.fontWeight = "bold";
    cartCount.style.boxShadow =
        "0 5px 15px rgba(0,0,0,0.25)";

    document.body.appendChild(cartCount);


    // Tombol + pada setiap produk
    tombolTambah.forEach(function (button) {

        button.addEventListener("click", function () {

            jumlahKeranjang++;

            cartCount.textContent =
                "🛒 Keranjang: " + jumlahKeranjang;

            // Animasi tombol
            button.textContent = "✓";
            button.style.background = "#d4af37";

            setTimeout(function () {
                button.textContent = "+";
                button.style.background = "";
            }, 800);

        });

    });


    // Tombol + Keranjang
    tombolKeranjang.forEach(function (button) {

        button.addEventListener("click", function () {

            if (jumlahKeranjang === 0) {

                alert(
                    "🛍️ Keranjang masih kosong.\n" +
                    "Silakan pilih produk terlebih dahulu."
                );

            } else {

                alert(
                    "🛍️ Isi keranjang kamu: " +
                    jumlahKeranjang +
                    " produk."
                );

            }

        });

    });


    // ============================
    // TOMBOL ENTER UNTUK SEARCH
    // ============================

    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            searchProduct();
        }

    });

});