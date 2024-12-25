import { IMAGES } from "./image";

const HIGHTLIGHTPRODUCT = [
  {
    id: 1,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: "/product.png",
    price: "399,000",
    rating: 5,
    review: 1,
  },
  {
    id: 2,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: "/product.png",
    price: "399,000",
    rating: 5,
    review: 1,
  },
];

const CATEGORIES = [
  {
    id: 0,
    name: "TẤT CẢ",
  },
  {
    id: 1,
    name: "ẢNH PLASTIC",
  },
  {
    id: 2,
    name: "KHUNG ẢNH",
  },
  {
    id: 3,
    name: "ALBUM",
  },
];

const PRODUCTS = [
  {
    id: 1,
    cate: 1,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
      {
        id: 6,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 06",
      },
    ],
    price: "399,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    discount: "-7%",
    hasGift: true,
    soldAmount: "2k đã bán",
  },
  {
    id: 2,
    cate: 1,
    title:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 03",
      },
    ],
    price: "399,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 3,
    cate: 2,
    title: "Khung Ảnh Nhựa Cao Cấp Bền Bỉ",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#8C32E1",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 03",
      },
    ],
    price: "75,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh làm từ chất liệu nhựa cao cấp, nhẹ nhàng và bền bỉ, phù hợp để treo ở mọi không gian.",
    discount: "-9%",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 4,
    cate: 2,
    title: "Khung Ảnh 3D Chất Lượng Cao 4K Siêu Nét",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
    ],
    price: "220,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh 3D chất lượng 4K, mang lại chiều sâu và độ sắc nét tuyệt hảo cho ảnh của bạn.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 5,
    cate: 2,
    title: "Khung Ảnh Đĩa Xoay Độc Đáo Linh Hoạt",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
    ],
    price: "145,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh độc đáo với thiết kế đĩa xoay, cho phép xoay chuyển hình ảnh một cách linh hoạt.",
    discount: "-10%",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 6,
    cate: 2,
    title: "Khung Ảnh HD Siêu Nét Chất Lượng 4K",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
    ],
    price: "180,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh HD chất lượng cao với độ phân giải 4K, mang lại sự sắc nét và sống động.",
    discount: "",
    hasGift: true,
    soldAmount: "2k đã bán",
  },
  {
    id: 7,
    cate: 2,
    title: "Khung Ảnh Để Bàn Nhỏ Gọn Sang Trọng",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
    ],
    price: "60,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh để bàn tinh tế, thích hợp cho bàn làm việc hoặc không gian nhỏ.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 8,
    cate: 2,
    title: "Khung Ảnh Hoa Văn Trang Trí Nghệ Thuật",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
    ],
    price: "95,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh trang trí với họa tiết hoa văn tinh xảo, tạo điểm nhấn nghệ thuật cho ảnh.",
    discount: "",
    hasGift: true,
    soldAmount: "2k đã bán",
  },
  {
    id: 9,
    cate: 2,
    title: "Khung Ảnh Titan Cao Cấp Cỡ A1",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
      {
        id: 6,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 06",
      },
    ],
    price: "310,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh cỡ A1 với chất liệu titan bền bỉ, sang trọng, chịu được va đập và thời gian.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 10,
    cate: 2,
    title: "Khung Ảnh Titan Thanh Lịch Cỡ A2",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
      {
        id: 6,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 06",
      },
    ],
    price: "280,000",
    rating: 5,
    review: 1,
    description:
      "Khung titan kích thước A2, hoàn hảo cho những bức ảnh lớn, mang lại vẻ đẹp thanh lịch.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 11,
    cate: 2,
    title: "Khung Ảnh TA Độ Phân Giải Cao 4K",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
    ],
    price: "210,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh TA 4K dành cho những ai yêu thích độ phân giải cao và chi tiết sắc nét.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 12,
    cate: 2,
    title: "Khung Ảnh TA Siêu Nét Chất Lượng 6K",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
    ],
    price: "270,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh TA chất lượng 6K siêu sắc nét, cho trải nghiệm thị giác đỉnh cao.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 13,
    cate: 2,
    title: "Khung Ảnh Tráng Gương Viền Bóng Sang Trọng",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
      {
        id: 6,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 06",
      },
    ],
    price: "130,000",
    rating: 5,
    review: 1,
    description:
      "Khung ảnh tráng gương với viền nổi bật, tạo hiệu ứng sáng bóng và sang trọng.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 14,
    cate: 3,
    title: "Album Ảnh Cán Màng Bảo Vệ Độ Bền Cao",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
      {
        id: 6,
        img: "/product.png",
        color: "#E37CF7",
        colorLabel: "Màu Khung 06",
      },
    ],
    price: "95,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh cán màng bền đẹp, giúp bảo vệ hình ảnh lâu dài khỏi trầy xước và bụi bẩn.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 15,
    cate: 3,
    title: "Album Ảnh Cán Màng Mờ Chống Lóa",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
    ],
    price: "89,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh cán màng mờ giúp giảm độ lóa, giữ cho hình ảnh luôn rõ ràng.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 16,
    cate: 3,
    title: "Album Ruột Sắc Nét Ảnh Cán Màng",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
    ],
    price: "150,000",
    rating: 5,
    review: 1,
    description: `Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.
  Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.
  Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.
  Album ảnh siêu sắc nét với lớp cán màng bảo vệ, giúp ảnh luôn tươi sáng và không phai màu.`,
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 17,
    cate: 3,
    title: "Album Ảnh Siêu Sắc Nét Không Cán Màng",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
      {
        id: 5,
        img: "/product.png",
        color: "#4C9E30",
        colorLabel: "Màu Khung 05",
      },
    ],
    price: "140,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh siêu sắc nét không cán màng, giữ nguyên vẻ chân thực của hình ảnh.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
  {
    id: 18,
    cate: 3,
    title: "Album Ảnh Tráng Gương Cao Cấp Bóng Loáng",
    image: [
      {
        id: 1,
        img: "/product.png",
        color: "#F2A71B",
        colorLabel: "Màu Khung 01",
      },
      {
        id: 2,
        img: "/product.png",
        color: "#7D6CFF",
        colorLabel: "Màu Khung 02",
      },
      {
        id: 3,
        img: "/product.png",
        color: "#1FB4A8",
        colorLabel: "Màu Khung 03",
      },
      {
        id: 4,
        img: "/product.png",
        color: "#D93A58",
        colorLabel: "Màu Khung 04",
      },
    ],
    price: "129,000",
    rating: 5,
    review: 1,
    description:
      "Album ảnh tráng gương với ảnh HD sắc nét và khung viền bóng loáng, mang lại sự sang trọng tuyệt đối.",
    discount: "",
    hasGift: false,
    soldAmount: "2k đã bán",
  },
];

const CUSTOMERREVIEW = [
  {
    id: 1,
    name: "Anh Huy",
    review:
      "Tôi đã mua sản phẩm ở đây rất nhiều lần, sản phẩm tốt cho sức khỏe con, sẽ ủng hộ tiếp.",
    role: "Người Tiêu Dùng",
  },
  {
    id: 2,
    name: "Anh Hùng",
    review:
      "Tôi đã mua sản phẩm ở đây rất nhiều lần, sản phẩm tốt cho sức khỏe con, sẽ ủng hộ tiếp.",
    role: "Người Tiêu Dùng",
  },
  {
    id: 3,
    name: "Anh Trọng",
    review:
      "Tôi đã mua sản phẩm ở đây rất nhiều lần, sản phẩm tốt cho sức khỏe con, sẽ ủng hộ tiếp.",
    role: "Người Tiêu Dùng",
  },
];

const POSTS = [
  {
    id: 1,
    image: IMAGES.BLOG,
    title: "Bài viết mẫu - Nhóm sản phẩm",
    excerpt:
      "Giáng Sinh là dịp lễ thích hợp để mỗi người có thể bày tỏ lòng yêu thương của mình đến người thân yêu thông qua những món quà. Và nếu ba mẹ đang chưa biết nên...",
    date: "27.06.2024",
    author: "Thuc Nguyen",
    slug: "bai-viet-mau",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
  {
    id: 2,
    image: IMAGES.BLOG,
    title: "Bài viết mẫu - Nhóm sản phẩm",
    excerpt:
      "Giáng Sinh là dịp lễ thích hợp để mỗi người có thể bày tỏ lòng yêu thương của mình đến người thân yêu thông qua những món quà. Và nếu ba mẹ đang chưa biết nên...",
    date: "27.06.2024",
    author: "Thuc Nguyen",
    slug: "giai-ma-gen-cho-be",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
  {
    id: 3,
    image: IMAGES.BLOG,
    title: "Bài viết mẫu - Nhóm sản phẩm",
    excerpt:
      "Giáng Sinh là dịp lễ thích hợp để mỗi người có thể bày tỏ lòng yêu thương của mình đến người thân yêu thông qua những món quà. Và nếu ba mẹ đang chưa biết nên...",
    date: "27.06.2024",
    author: "Thuc Nguyen",
    slug: "bai-viet-mau",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
  {
    id: 4,
    image: IMAGES.BLOG,
    title: "Vì sao ba mẹ nên giải mã gen cho bé trong 1000 ngày đầu đời?",
    excerpt:
      "Trẻ trong 1000 ngày đầu đời không thể nói hay diễn đạt trọn vẹn thứ mình cần. Thay lời muốn nói của chính cơ thể trẻ, giải mã gen ở thời điểm này sẽ giúp ba mẹ bố...",
    date: "21.05.2024",
    author: "Thuc Nguyen",
    slug: "giai-ma-gen-cho-be",
    content: `"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."`,
  },
];

export const DATA = {
  HIGHTLIGHTPRODUCT,
  PRODUCTS,
  CUSTOMERREVIEW,
  POSTS,
  CATEGORIES,
};
