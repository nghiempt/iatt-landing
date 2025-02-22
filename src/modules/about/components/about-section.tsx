import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import BannerSlider from "./slider";

interface PolicySection {
    title: string;
    content: React.ReactNode;
}

interface ServiceCard {
    title: string;
    description: string;
    imageSrc: string;
}

const AboutSection = () => {
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
    const services: ServiceCard[] = [
        {
            title: "ALBUM CƯỚI, TIỆC",
            description: "Biến từng tấm ảnh cưới thành một câu chuyện đầy riêng tư và ý nghĩa. Với đa dạng mẫu mã được tối ưu theo phong cách riêng của bạn – từ hiện đại, vintage, phong cách Hàn Quốc đến sự hòa quyện với thiên nhiên, chúng tôi mang đến những thiết kế album độc đáo, tinh tế. Đặc biệt, chất lượng hình ảnh luôn sắc nét, chống trầy xước, giúp bạn lưu giữ kỷ niệm một cách hoàn hảo.",
            imageSrc: "https://s3-alpha-sig.figma.com/img/d4eb/9c49/c1f92fba641ceff562e7014c157e33e4?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=ka1IYClYtvz3V5CTMzO0x3H9ts9HGeaJQ3fA9ZNSHbn8j0rqHUSWL0292MHrSyQb7ZzFD9fwSTNQLzHE2CCDwlQVYvZ8ExBazeA~SOvSEOlQwjgT8AOBVD7SwTSIQKJGcJYjynF2gymRk9iha79Rcbz~gcdRYYNfWuCClzFeO8U6-JHrTYI5mCCNctdDH4UFxwakKrVgnnJhepncTUBzXqzTCklHk0Q8MBxS5ngF5UHz5V5Frq~MklThg6SE7WCzEKAR1zsniJ~-c9tPV2HRrl6I4GoZ5YhSu3CFgHfTqFT2KabVZeXGJm1kUVrXJNaBC~6zdY5DwdfkZEhkl35hNA__"
        },
        {
            title: "ẢNH ÉP GỖ KHUNG VIỀN",
            description: "Mang đến sự lựa chọn hoàn hảo cho ảnh cưới và tiệc với thiết kế hiện đại, phù hợp mọi không gian trang trí. Bộ sưu tập đa dạng, mẫu mã mới bắt khung viền Titan sang trọng, Khung gỗ cổ điển, khung viền Hàn Quốc... hiện đại tinh tế. Từng sản phẩm đều được thiết kế để tôn lên vẻ đẹp của khoảnh khắc và hòa quyện với mọi bối cảnh trang trí.",
            imageSrc: "https://s3-alpha-sig.figma.com/img/0173/6e47/0d602ea6302b6216b03cb46206a4e87e?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=FrTT-QplEMhWP1kjvue7fHc8RaaVoF1EUi4igEBgzZA5F1K8cm47xg6qyMNGaQE34otw3aqaVxE0MqmAza1yKdiUAFCVZTSzvRWhCWbFA7JR7XVyTkYuWYjMoMFTg3nPLsjTdUv440GpCOonKO0T3wCwkf30jXfue5u9fIubY7R6YsbNu~S6gfE2iVibh5ADeHPuY4kcAyLWFZGBZKkem16xQtgIXc2rsXENbyHvJOJEj1dhaKF11QOaCVfQRkp6WDhVVKPDWQAgF-ixxk~3SyY1lgO5NiWQ0cavpI3uyW5AqFkuCsNwGmTNNA2dprrgGrUfj2l2rEeyBJvXND1IWQ__"
        },
        {
            title: "ẢNH ÉP PLASTIC, LỤA",
            description: "Lưu giữ trọn vẹn vẻ đẹp thời gian với dịch vụ in ảnh ép Plastic và Lụa. Ảnh được in bằng máy in chất lượng, đảm bảo độ sắc nét tuyệt đối và màu sắc bền đẹp trên 10 năm. Từng sản phẩm đều được in ấn tỉ mỉ, mang đến sự hài lòng tối đa và trở thành món quà ý nghĩa để lưu giữ những kỷ niệm của bạn.",
            imageSrc: "https://s3-alpha-sig.figma.com/img/5ecd/4f30/190e30f2678eadaebfb8b81adc635251?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Ffim5jo0Wq70zfm8bQC0pIwEnhpqzbHqYqi0YQ3lqYvKE4N18xzSj~PvyP6Vt799nnZFDYds710dRdFswoTRWIJ8Fpe0sA9jCdAUCMgd4wy-XwDclN9j0qtRmH8xnS10kr24bpOpahAFn2BO-4wrO7W~wcNnuezYVkkGvzYPJAUo2ozmpE1xr8NC1gr-o54KGViaYAarjkqtB70ULmbKedfTBpfBdONcrfSj6nv-5UUH1pSfzlD1blSGTVyXE-~fjRugqSjQJ3pakzFn6Hvq1PU4CXxuXA0hJfvbJ2v714bGB6TAwBeu0IRHapllSz86kjcme336BiqK-kHNpJKcEw__"
        }
    ];
    const paymentContent = (
        <div className="space-y-4 text-gray-600">
          <p className="mb-4">
            Khách hàng có thể đặt hàng qua website hoặc liên hệ <span className="font-semibold">đường dây nóng: 0123456789</span>.
          </p>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-800">Phương thức thanh toán:</h3>
            <ul className="list-disc pl-6 ">
              <li>Thanh toán khi nhận hàng: Quý khách thanh toán đầy đủ giá trị đơn hàng ngay sau khi kiểm tra hàng hóa.</li>
              <li>
                <p className="mb-2">Thanh toán chuyển khoản:</p>
                <ul className="list-none pl-6">
                  <li>- Tên tài khoản: [Tên tài khoản]</li>
                  <li>- Số tài khoản: [Số tài khoản]</li>
                  <li>- Ngân hàng: [Tên ngân hàng]</li>
                  <li>- Chi nhánh: [Chi nhánh]</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      );
    const introductionContent = (
        <div className="space-y-8">
            <div className="text-gray-600">
                <p className="mb-4 font-semibold text-xl">
                    Chào mừng bạn đến với INANHTHUCTUYEN.COM
                </p>
                <p className="mb-4">
                    Tại INANHTHUCTUYEN.COM, chúng tôi thấu hiểu rằng những khoảnh khắc quan trọng trong cuộc đời không chỉ là dấu ấn của thời gian, mà còn là những cột mốc ý nghĩa trong hành trình sống của mỗi người. Được đồng hành cùng những giây phút đặc biệt, từ niềm hạnh phúc tròn vẹn trong ngày cưới, niềm vui tuổi già gặp ngày tân xuân, sự ấm áp của bữa tiệc thôi nôi bên gia đình, về đẹp rực rỡ của thanh xuân thời thiếu nữ, đến những bức ảnh gia đình tràn đầy yêu thương, gắn kết qua từng thế hệ.
                </p>
                <p>
                    Với niềm đam mê và chuyên môn trong thiết kế và gia công, chúng tôi tự hào mang đến những sản phẩm độc đáo, tinh tế, giúp bạn lưu giữ trọn vẹn những kỷ niệm quý giá. Đó là niềm vui, nơi nhớ, hay tình cảm gia đình sâu sắc, chúng tôi tin rằng mỗi khoảnh khắc đều xứng đáng được trân trọng và được hiện diện theo cách đặc biệt nhất.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">DỊCH VỤ NỔI BẬT CỦA CHÚNG TÔI</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <div key={service.title} className="bg-white border-gray-200 border overflow-hidden p-4">
                            <div className="relative h-48">
                                <Image
                                    src={service.imageSrc}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 "
                                    width={397}
                                    height={465}
                                />
                                <div className="bg-black opacity-30 absolute top-0 left-0 right-0 bottom-0"></div>
                                <div className="absolute top-[45%] left-0 right-0 ">
                                    <h3 className="text-xl font-bold mb-2 text-white text-center">{service.title}</h3>
                                </div>
                            </div>
                            

                            <div className="pt-4">
                                <p className="text-gray-600 text-sm">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
    const privacyContent = (
        <div className="space-y-4 text-gray-600">
            <p className="mb-4">
                Khi truy cập website INANHTHUCTUYEN.COM, quý khách đồng ý và chấp nhận thực hiện những mô tả trong Chính sách bảo mật thông tin. Nếu quý khách không đồng ý với các điều khoản của Chính sách này, vui lòng không sử dụng website của chúng tôi. Chính sách này được đưa ra nhằm bảo vệ quyền lợi của quý khách khi sử dụng dịch vụ và mua hàng.
            </p>

            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">1. Mục đích và phạm vi thu thập thông tin</h3>
                <p>Việc thu thập dữ liệu trên website INANHTHUCTUYEN.COM bao gồm:</p>
                <ul className="list-disc pl-6">
                    <li>Email</li>
                    <li>Số điện thoại</li>
                    <li>Địa chỉ khách hàng</li>
                    <li>Hình ảnh khách hàng</li>
                    <li>Thông tin thanh toán</li>
                </ul>
                <p>Đây là các thông tin bắt buộc quý khách cần cung cấp khi sử dụng dịch vụ để chúng tôi thiết kế, in ấn và liên hệ xác nhận, đảm bảo quyền lợi và hoàn thiện đơn hàng.</p>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">2. Phạm vi sử dụng thông tin</h3>
                <p>Chúng tôi sử dụng thông tin quý khách cung cấp để:</p>
                <ul className="list-disc pl-6">
                    <li>Cung cấp hình ảnh cho công cụ AI để thực hiện chỉnh sửa</li>
                    <li>Giao hàng tới địa chỉ do quý khách cung cấp</li>
                    <li>Liên lạc và giải quyết trong những trường hợp đặc biệt</li>
                    <li>Cung cấp thông tin cho các đơn vị vận chuyển nhằm giao nhận hàng hóa</li>
                    <li>Chỉ có quan tụ pháp có yêu cầu thì mới cung cấp thông tin gồm: Viện kiểm sát, tòa án, công an điều tra</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">3. Cam kết bảo mật thông tin cá nhân khách hàng</h3>
                <ul className="list-disc pl-6">
                    <li>Thông tin cá nhân của quý khách được chúng tôi cam kết bảo mật tuyệt đối, không sử dụng hoặc cung cấp cho bên thứ 3 nếu không có sự đồng ý từ quý khách.</li>
                    <li>Thông tin có thể được cung cấp cho bên vận chuyển nhằm giao nhận hàng hóa gồm: tên, địa chỉ, số điện thoại.</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">4. Thời gian lưu trữ thông tin</h3>
                <p>Chúng tôi sẽ lưu trữ thông tin cá nhân của quý khách trong suốt quá trình cung cấp dịch vụ hoặc cho đến khi quý khách yêu cầu hủy bỏ.</p>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">5. Địa chỉ đơn vị thu thập và quản lý thông tin cá nhân</h3>
                <p>Cở sở kinh doanh INANH THUC TUYEN</p>
                <ul className="list-disc pl-6">
                    <li>Địa chỉ: QL91 Tân Thành, Cà Mau</li>
                    <li>Điện thoại: 0939.468.252</li>
                </ul>
            </div>

            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">6. Phương tiện và công cụ để người dùng tiếp cận và chỉnh sửa dữ liệu cá nhân</h3>
                <p>Quý khách có thể thực hiện quyền kiểm tra, cập nhật, chỉnh sửa hoặc hủy bỏ thông tin cá nhân bằng cách:</p>
                <ul className="list-disc pl-6">
                    <li>Truy cập website INANHTHUCTUYEN.COM</li>
                    <li>Liên hệ qua email hoặc địa chỉ liên lạc công bố trên website.</li>
                </ul>
            </div>
        </div>
    );
    const shippingContent = (
        <div className="space-y-4 text-gray-600">
            <p className="mb-4">
                Sau khi khách hàng đặt hàng trên trang web INANHTRUCTUYEN.COM, hệ thống sẽ tự động gửi thông báo xác nhận đã đặt hàng. Đội ngũ hỗ trợ của chúng tôi sẽ liên hệ với Quý khách qua số điện thoại mà Quý khách đã cung cấp để xác minh thông tin đơn hàng, thông báo chi phí vận chuyển, thời gian giao hàng dự kiến và các thông tin cần thiết khác.
                Chúng tôi hỗ trợ giao hàng tận nơi trên toàn quốc
            </p>
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">Thời gian giao hàng:</h3>
                <ul className="list-disc pl-6">
                    <li>Nội thành TP.HCM: 1-2 ngày (không tính thứ 7, chủ nhật).</li>
                    <li>Các khu vực khác: 3-7 ngày (không tính thứ 7, chủ nhật và các ngày lễ)</li>
                </ul>
            </div>
            <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">Chi phí giao hàng:</h3>
                <ul className="list-disc pl-6">
                    <li>Miễn phí vận chuyển cho đơn hàng từ ... VNĐ.</li>
                    <li>Phí ... VNĐ cho các đơn hàng dưới ... VNĐ.</li>
                </ul>
            </div>
        </div>
    );

    const returnContent = (
        <div className="space-y-4 text-gray-600">
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">Lý do chấp nhận đổi trả:</h3>
            <ul className="list-disc pl-6 ">
              <li>Sản phẩm giao sai về số lượng, thông tin hoặc mẫu mã.</li>
              <li>Sản phẩm bị hỏng do lỗi sản xuất hoặc trong quá trình vận chuyển.</li>
            </ul>
          </div>
    
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">Yêu cầu trả hàng:</h3>
            <ul className="list-disc pl-6">
              <li>Sản phẩm còn đóng gói nguyên vẹn.</li>
              <li>Đầy đủ phụ kiện và quà tặng (nếu có).</li>
              <li>Không có dấu hiệu đã qua sử dụng.</li>
            </ul>
          </div>
    
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">Thời gian đổi trả:</h3>
            <p className="pl-6">
              <span className="text-yellow-500 font-bold">Trong vòng 24h kể từ khi nhận hàng.</span>
            </p>
          </div>
    
          <div className="space-y-2">
            <h3 className="text-lg font-bold text-gray-800">Chi phí đổi trả:</h3>
            <ul className="list-disc pl-6 ">
              <li>Đổi lỗi của chúng tôi: Miễn phí vận chuyển hai chiều.</li>
              <li>Do nhu cầu của khách: Khách hàng thanh toán chi phí vận chuyển.</li>
            </ul>
          </div>
        </div>
      );
    const policies: PolicySection[] = [
        {
            title: "Giới thiệu",
            content: introductionContent
        },
        { title: "Chính sách bảo mật", content: privacyContent },
        { title: "Chính sách giao hàng", content: shippingContent },
        { title: "Chính sách thanh toán", content: paymentContent },
        { title: "Chính sách đổi trả", content: returnContent },
    ];



    const toggleSection = (title: string) => {
        setExpandedSections(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Banner */}
            <BannerSlider />


            {/* Policy Sections */}
            <div className=" px-4 py-4 lg:pb-0 lg:px-0">
                {/* <div className="max-w-3xl mx-auto"> */}
                {policies.map((policy) => (
                    <div key={policy.title} className="">
                        <button
                            onClick={() => toggleSection(policy.title)}
                            className="w-full py-4 flex justify-start items-center text-left border-b border-gray-300"
                        >
                            <span className="text-2xl font-bold text-gray-800 pr-2">{policy.title}</span>
                            <ChevronDown
                                className={`w-5 h-5 transition-transform ${expandedSections[policy.title] ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>
                        {expandedSections[policy.title] && (
                            <div className=" py-4 text-gray-600">
                                {policy.content}
                            </div>
                        )}
                    </div>
                ))}
                {/* </div> */}
            </div>
        </div>
    );
};

export default AboutSection;